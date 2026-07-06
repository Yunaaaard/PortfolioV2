import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail, Facebook, Instagram } from "lucide-react";
import { SectionReveal, RevealItem } from "./SectionReveal";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

// Pads a date range to begin on Sunday and end on Saturday to form clean 7-day columns
const getCalendarGrid = (year: string, allData: ContributionDay[], highestYear: string) => {
  let startDate: Date;
  let endDate: Date;

  if (year === highestYear) {
    // Rolling year ending today
    endDate = new Date();
    startDate = new Date();
    startDate.setDate(endDate.getDate() - 370);
  } else {
    // Calendar year
    startDate = new Date(`${year}-01-01`);
    endDate = new Date(`${year}-12-31`);
  }

  // Adjust startDate to the nearest preceding Sunday
  const startDayOfWeek = startDate.getDay();
  const paddedStartDate = new Date(startDate);
  paddedStartDate.setDate(startDate.getDate() - startDayOfWeek);

  // Adjust endDate to the nearest succeeding Saturday
  const endDayOfWeek = endDate.getDay();
  const paddedEndDate = new Date(endDate);
  paddedEndDate.setDate(endDate.getDate() + (6 - endDayOfWeek));

  const dayList: ContributionDay[] = [];
  const currentDate = new Date(paddedStartDate);

  const dataMap = new Map<string, ContributionDay>();
  allData.forEach(d => dataMap.set(d.date, d));

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

  useEffect(() => {
    // Multi-year fallback generator if API fails
    const generateMockContributions = () => {
      const mock: ContributionDay[] = [];
      const today = new Date();
      // 4 years * 365 days = 1460 days
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
        } else if (rand > 0.60) {
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

          // Get sorted unique years list
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

  // Filter contributions to form the grid
  const contributionsForGrid = selectedYear
    ? getCalendarGrid(selectedYear, allContributions, highestYear)
    : [];

  const weeks: ContributionDay[][] = [];
  if (contributionsForGrid.length > 0) {
    for (let i = 0; i < contributionsForGrid.length; i += 7) {
      weeks.push(contributionsForGrid.slice(i, i + 7));
    }
  }

  // Auto-scroll the mobile swipe container to the far right (most recent contributions) on load
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [weeks]);

  // Calculate dynamic month headers along columns
  const monthLabels: { label: string; index: number }[] = [];
  let prevMonth = "";
  weeks.forEach((week, wIndex) => {
    if (week[0]) {
      const date = new Date(week[0].date);
      const month = date.toLocaleString("default", { month: "short" });
      if (month !== prevMonth) {
        // If it's the very first week column, look ahead to see if the month changes in the next week or two.
        // If it does, we skip labeling index 0 to avoid labeling a short padded month, allowing the next
        // full month label to sit cleanly without overlap.
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

  // Sum total contributions for the selected period
  const totalContributions = selectedYear
    ? allContributions
      .filter((d) => {
        if (selectedYear === highestYear) {
          // rolling year
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
    <section className="min-h-screen flex items-center justify-center relative py-20">
      <div className="container mx-auto px-6 z-10">
        <SectionReveal direction="up" stagger={0.18} className="max-w-5xl mx-auto text-center">

          <RevealItem direction="down">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
              {"Hi, I'm "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(167,139,250,0.6)]">
                Leonard Tariman
              </span>
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8 select-none font-mono-jb">
              {"I love "}
              <motion.span
                className="inline-block cursor-pointer text-violet-400 font-semibold hover:drop-shadow-[0_0_12px_rgba(167,139,250,0.8)]"
                whileHover={{
                  scale: 1.25,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                milkte
              </motion.span>
              {" "}
              <motion.span
                className="inline-block cursor-pointer text-fuchsia-400 font-semibold hover:drop-shadow-[0_0_12px_rgba(232,121,249,0.8)]"
                whileHover={{
                  scale: 1.25,
                  y: [0, -10, 0],
                  transition: {
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }
                }}
                whileTap={{ scale: 0.95 }}
              >
                borjer
              </motion.span>
              {" at "}
              <motion.span
                className="inline-block cursor-pointer text-cyan-400 font-semibold hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                whileHover={{
                  scale: 1.25,
                  skewX: [0, 15, -15, 15, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                chaka
              </motion.span>
              {" "}
              <motion.span
                className="inline-block cursor-pointer text-amber-400 font-semibold hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                whileHover={{
                  scale: 1.25,
                  rotate: 360,
                  transition: { duration: 0.6 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                frays
              </motion.span>
              {"."}
            </p>
          </RevealItem>

          <RevealItem>
            <div className="flex gap-4 justify-center mb-12">
              <a
                href="#contact"
                className="neon-btn px-8 py-3 rounded-lg text-white font-medium"
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="neon-btn-outline px-8 py-3 rounded-lg border border-violet-500/50 text-violet-300 transition-all"
              >
                View Work
              </a>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="flex gap-6 justify-center mb-12">
              <a
                href="https://github.com/Yunaaaard"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-icon text-zinc-500 transition-colors"
                title="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/yunaaaard/"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-icon text-zinc-500 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/leonaaaaard"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-icon text-zinc-500 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/yunaaaard_/"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-icon text-zinc-500 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://open.spotify.com/user/31fgweu34glpl2twxctda5wbylr4"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-icon text-zinc-500 transition-colors"
                title="Spotify"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-1.02a.602.602 0 0 1-.714-.463c-.113-.32.109-.643.43-.73 3.847-.833 7.143-.46 9.83 1.182.296.18.388.566.207.861zm1.224-2.724c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.078-1.182a.798.798 0 0 1-.998-.514.8.8 0 0 1 .514-.997c3.673-1.114 8.243-.578 11.375 1.345.367.228.488.708.261 1.088zm.106-2.833C14.484 8.766 8.813 8.58 5.534 9.575a.998.998 0 0 1-1.2-.734.998.998 0 0 1 .733-1.199c3.757-1.14 10.012-.924 14.07 1.485a.999.999 0 0 1-.36 1.84z" />
                </svg>
              </a>
              <a
                href="mailto:tarimanleonard28@gmail.com"
                className="neon-icon text-zinc-500 transition-colors"
                title="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </RevealItem>

        </SectionReveal>

        {/* GitHub Contributions Graph — rendered outside SectionReveal so it animates
            independently after async data loads (SectionReveal fires once: true on mount,
            before the fetch completes, so late-mounted RevealItems stay at opacity 0). */}
        {weeks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col lg:flex-row gap-6 items-start text-left max-w-4xl mx-auto mt-12 px-4 w-full">

              {/* Graph Main Panel */}
              <div className="flex-1 w-full max-w-full overflow-hidden">
                <div className="flex justify-between items-end mb-2 px-1 select-none">
                  <span className="text-xs sm:text-[14px] font-normal text-white">
                    {totalContributions.toLocaleString()} contributions in {selectedYear === highestYear ? "the last year" : selectedYear}
                  </span>
                </div>

                {/* Graph Card — overflow-x-auto on mobile, hidden on desktop */}
                <div
                  ref={scrollContainerRef}
                  className="border border-zinc-800 rounded-lg p-3 sm:p-4 bg-zinc-950/20 backdrop-blur-sm w-full overflow-x-auto sm:overflow-x-hidden"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >

                  {/* Month row + Heatmap + Weekday labels — single flat 2D grid */}
                  <div
                    className="w-[720px] sm:w-full select-none shrink-0"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `24px repeat(${weeks.length}, 1fr)`,
                      gridTemplateRows: `14px repeat(7, 1fr)`,
                      gap: '2px',
                    }}
                  >
                    {/* Top-left corner spacer (row 1, col 1) */}
                    <div />

                    {/* Month labels along top row (row 1, cols 2+) */}
                    {weeks.map((week, wIndex) => {
                      const labelObj = monthLabels.find((m) => m.index === wIndex);
                      return (
                        <div key={`m-${wIndex}`} className="overflow-visible relative">
                          {labelObj && (
                            <span className="absolute left-0 top-0 whitespace-nowrap text-[8px] sm:text-[9px] text-zinc-500 font-normal leading-none">
                              {labelObj.label}
                            </span>
                          )}
                        </div>
                      );
                    })}

                    {/* Weekday labels (col 1, rows 2-8) interleaved with day cells */}
                    {/* We render all 7 day-rows. For each row, first the label, then the cells. */}
                    {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => {
                      const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
                      return [
                        /* Weekday label cell */
                        <div
                          key={`label-${dayIndex}`}
                          className="flex items-center justify-end pr-1 text-[8px] sm:text-[9px] text-zinc-500 font-normal leading-none"
                        >
                          {dayLabels[dayIndex]}
                        </div>,
                        /* Day cells for this row across all weeks */
                        ...weeks.map((week, wIndex) => {
                          const day = week[dayIndex];
                          if (!day) return <div key={`empty-${wIndex}-${dayIndex}`} />;
                          return (
                            <div
                              key={`d-${wIndex}-${dayIndex}`}
                              className={`w-full aspect-square rounded-[2px] transition-all duration-200 ${day.level === 0 ? "bg-[#161b22]" :
                                day.level === 1 ? "bg-[#0e4429]" :
                                  day.level === 2 ? "bg-[#006d32]" :
                                    day.level === 3 ? "bg-[#26a641]" :
                                      "bg-[#39d353]"
                                } hover:scale-[1.4] hover:z-10 hover:brightness-110 cursor-pointer`}
                              title={`${day.count} contributions on ${day.date}`}
                            />
                          );
                        })
                      ];
                    }).flat()}
                  </div>

                  {/* Card Bottom Footer */}
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-normal mt-3 pl-[24px] pr-1">
                    <div className="flex items-center gap-1 select-none flex-shrink-0">
                      <span>Less</span>
                      <div className="w-[10px] h-[10px] rounded-[2px] bg-[#161b22]" />
                      <div className="w-[10px] h-[10px] rounded-[2px] bg-[#0e4429]" />
                      <div className="w-[10px] h-[10px] rounded-[2px] bg-[#006d32]" />
                      <div className="w-[10px] h-[10px] rounded-[2px] bg-[#26a641]" />
                      <div className="w-[10px] h-[10px] rounded-[2px] bg-[#39d353]" />
                      <span>More</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Selector Column (Years stack) */}
              <div className="flex flex-row lg:flex-col gap-1.5 w-full lg:w-20 flex-shrink-0 pt-0 lg:pt-8 select-none justify-center lg:justify-start flex-wrap">
                {years.map(y => (
                  <button
                    key={y}
                    onClick={() => setSelectedYear(y)}
                    className={`text-[12px] py-1 px-3 sm:px-4 rounded-lg text-center font-semibold transition-all ${selectedYear === y
                      ? "bg-[#0969da] text-white shadow-md shadow-blue-500/15"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"
                      }`}
                  >
                    {y}
                  </button>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="neon-icon absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 transition-colors"
      >
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </motion.a>
    </section>
  );
}
