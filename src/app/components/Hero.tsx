import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Facebook, Instagram } from "lucide-react";
import { SectionReveal, RevealItem } from "./SectionReveal";
import { RubiksCube } from "./RubiksCube";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const getCalendarGrid = (year: string, allData: ContributionDay[], highestYear: string) => {
  let startDate: Date;
  let endDate: Date;

  if (year === highestYear) {
    endDate = new Date();
    startDate = new Date();
    startDate.setDate(endDate.getDate() - 370);
  } else {
    startDate = new Date(`${year}-01-01`);
    endDate = new Date(`${year}-12-31`);
  }

  const startDayOfWeek = startDate.getDay();
  const paddedStartDate = new Date(startDate);
  paddedStartDate.setDate(startDate.getDate() - startDayOfWeek);

  const endDayOfWeek = endDate.getDay();
  const paddedEndDate = new Date(endDate);
  paddedEndDate.setDate(endDate.getDate() + (6 - endDayOfWeek));

  const dayList: ContributionDay[] = [];
  const currentDate = new Date(paddedStartDate);

  const dataMap = new Map<string, ContributionDay>();
  allData.forEach((d) => dataMap.set(d.date, d));

  while (currentDate <= paddedEndDate) {
    const dateStr = currentDate.toISOString().split("T")[0];
    const existing = dataMap.get(dateStr);
    dayList.push(existing || { date: dateStr, count: 0, level: 0 });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dayList;
};

export function Hero() {
  const [allContributions, setAllContributions] = useState<ContributionDay[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [years, setYears] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  useEffect(() => {
    const generateMockContributions = () => {
      const mock: ContributionDay[] = [];
      const today = new Date();
      for (let i = 1460; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const rand = Math.random();
        let level = 0;
        let count = 0;

        if (rand > 0.94) {
          level = 4;
          count = Math.floor(Math.random() * 8) + 12;
        } else if (rand > 0.88) {
          level = 3;
          count = Math.floor(Math.random() * 5) + 6;
        } else if (rand > 0.78) {
          level = 2;
          count = Math.floor(Math.random() * 3) + 3;
        } else if (rand > 0.6) {
          level = 1;
          count = Math.floor(Math.random() * 2) + 1;
        }

        mock.push({
          date: date.toISOString().split("T")[0],
          count,
          level,
        });
      }
      return mock;
    };

    const fetchContributions = async () => {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/Yunaaaard");
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();

        if (data.contributions && data.contributions.length > 0) {
          const fetched = data.contributions;
          setAllContributions(fetched);

          const uniqueYears = Array.from(
            new Set(fetched.map((d: any) => d.date.split("-")[0]))
          ).sort().reverse() as string[];

          setYears(uniqueYears);
          if (uniqueYears.length > 0) {
            setSelectedYear(uniqueYears[0]);
          }
        } else {
          throw new Error("Empty contributions");
        }
      } catch (err) {
        console.warn("Failed to fetch github contributions, using mock fallback:", err);
        const mock = generateMockContributions();
        setAllContributions(mock);

        const uniqueYears = Array.from(
          new Set(mock.map((d: any) => d.date.split("-")[0]))
        ).sort().reverse() as string[];

        setYears(uniqueYears);
        if (uniqueYears.length > 0) {
          setSelectedYear(uniqueYears[0]);
        }
      }
    };

    fetchContributions();
  }, []);

  const highestYear = years[0] || "";

  const contributionsForGrid = selectedYear
    ? getCalendarGrid(selectedYear, allContributions, highestYear)
    : [];

  const weeks: ContributionDay[][] = [];
  if (contributionsForGrid.length > 0) {
    for (let i = 0; i < contributionsForGrid.length; i += 7) {
      weeks.push(contributionsForGrid.slice(i, i + 7));
    }
  }

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [weeks]);

  const monthLabels: { label: string; index: number }[] = [];
  let prevMonth = "";
  weeks.forEach((week, wIndex) => {
    if (week[0]) {
      const date = new Date(week[0].date);
      const month = date.toLocaleString("default", { month: "short" });
      if (month !== prevMonth) {
        if (wIndex === 0) {
          const nextWeek = weeks[1];
          const nextNextWeek = weeks[2];
          const nextMonth = nextWeek?.[0] ? new Date(nextWeek[0].date).toLocaleString("default", { month: "short" }) : "";
          const nextNextMonth = nextNextWeek?.[0] ? new Date(nextNextWeek[0].date).toLocaleString("default", { month: "short" }) : "";
          if (nextMonth !== month || nextNextMonth !== month) {
            return;
          }
        }
        monthLabels.push({ label: month, index: wIndex });
        prevMonth = month;
      }
    }
  });

  const totalContributions = selectedYear
    ? allContributions
        .filter((d) => {
          if (selectedYear === highestYear) {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - 370);
            const date = new Date(d.date);
            return date >= startDate && date <= endDate;
          } else {
            return d.date.startsWith(selectedYear);
          }
        })
        .reduce((sum, d) => sum + d.count, 0)
    : 0;

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center relative pt-32 pb-20"
    >
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, willChange: "transform, opacity" }}
        className="container mx-auto px-6 z-10 max-w-5xl"
      >
        <SectionReveal direction="up" stagger={0.1}>
          {/* Main Editorial Heading & 3D Rubik's Companion */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-6">
            <div className="lg:col-span-8">
              <RevealItem>
                <h1 className="text-4xl sm:text-6xl md:text-[64px] font-semibold tracking-tight text-zinc-100 mb-6 leading-[1.06]">
                  Software developer building{" "}
                  <span className="font-serif-editorial italic font-normal text-zinc-300">
                    dependable
                  </span>{" "}
                  web &amp; mobile applications.
                </h1>
              </RevealItem>

              <RevealItem>
                <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-normal">
                  I&apos;m <span className="text-zinc-100 font-medium">Leonard Tariman</span>, an Information Technology graduate working with React, TypeScript, Flutter, and .NET to build clean interfaces and practical software.
                </p>
              </RevealItem>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <RevealItem direction="right">
                <RubiksCube />
              </RevealItem>
            </div>
          </div>

          {/* Actions & Socials */}
          <RevealItem>
            <div className="flex flex-wrap items-center justify-between gap-6 pb-14 border-b border-white/[0.07]">
              <div className="flex flex-wrap items-center gap-3">
                <a href="#projects" className="pro-btn-primary">
                  <span>Selected Work</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a href="#contact" className="pro-btn-secondary">
                  <span>Contact Me</span>
                </a>
              </div>

              <div className="flex items-center gap-1.5">
                {[
                  { icon: Github, href: "https://github.com/Yunaaaard", title: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/yunaaaard/", title: "LinkedIn" },
                  { icon: Facebook, href: "https://www.facebook.com/leonaaaaard", title: "Facebook" },
                  { icon: Instagram, href: "https://www.instagram.com/yunaaaard_/", title: "Instagram" },
                  { icon: Mail, href: "mailto:tarimanleonard28@gmail.com", title: "Email" },
                ].map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="w-9 h-9 rounded-full border border-white/[0.07] bg-white/[0.02] flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:border-white/20 transition-colors"
                    title={item.title}
                  >
                    <item.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </RevealItem>
        </SectionReveal>

        {/* GitHub Contributions Activity */}
        {weeks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <div className="pro-card p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-xs font-medium text-zinc-200">
                    GitHub Activity
                  </span>
                  <span className="text-xs text-zinc-500 font-mono-jb">
                    {totalContributions.toLocaleString()} contributions ({selectedYear === highestYear ? "past 12 months" : selectedYear})
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => setSelectedYear(y)}
                      className={`text-[11px] font-mono-jb py-1 px-2.5 rounded-full transition-colors cursor-pointer ${
                        selectedYear === y
                          ? "bg-zinc-100 text-zinc-950 font-medium"
                          : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]"
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              <div
                ref={scrollContainerRef}
                className="w-full overflow-x-auto overflow-y-hidden"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div
                  className="w-[720px] sm:w-full select-none shrink-0 py-1"
                  style={{
                    display: "grid",
                    gridTemplateColumns: `24px repeat(${weeks.length}, 1fr)`,
                    gridTemplateRows: `14px repeat(7, 1fr)`,
                    gap: "2.5px",
                  }}
                >
                  <div />

                  {weeks.map((week, wIndex) => {
                    const labelObj = monthLabels.find((m) => m.index === wIndex);
                    return (
                      <div key={`m-${wIndex}`} className="overflow-visible relative">
                        {labelObj && (
                          <span className="absolute left-0 top-0 whitespace-nowrap text-[9px] text-zinc-500 font-mono-jb leading-none">
                            {labelObj.label}
                          </span>
                        )}
                      </div>
                    );
                  })}

                  {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                    const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
                    return [
                      <div
                        key={`label-${dayIndex}`}
                        className="flex items-center justify-end pr-1 text-[8px] text-zinc-500 font-mono-jb leading-none"
                      >
                        {dayLabels[dayIndex]}
                      </div>,
                      ...weeks.map((week, wIndex) => {
                        const day = week[dayIndex];
                        if (!day) return <div key={`empty-${wIndex}-${dayIndex}`} />;
                        return (
                          <div
                            key={`d-${wIndex}-${dayIndex}`}
                            className={`w-full aspect-square rounded-[2px] transition-transform duration-150 ${
                              day.level === 0
                                ? "bg-zinc-900/90"
                                : day.level === 1
                                ? "bg-emerald-950/90"
                                : day.level === 2
                                ? "bg-emerald-800/80"
                                : day.level === 3
                                ? "bg-emerald-600"
                                : "bg-emerald-400"
                            } hover:scale-125 hover:z-10`}
                            title={`${day.count} contributions on ${day.date}`}
                          />
                        );
                      }),
                    ];
                  }).flat()}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-600 hover:text-zinc-300 transition-colors"
        aria-label="Scroll to About section"
      >
        <ArrowDown className="w-4 h-4" />
      </a>
    </section>
  );
}
