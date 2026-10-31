import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { ExternalLink, Check, Copy, Maximize2, X } from "lucide-react";
import { SectionReveal, RevealItem, EditorialSectionHeader } from "./SectionReveal";

const mongodbSchemaCert = new URL("../assets/certifications/mongodb-schema-lifecycle-management.jpg", import.meta.url).href;
const mongodbVectorSearchCert = new URL("../assets/certifications/mongodb-atlas-vector-search-for-rag-applications.jpg", import.meta.url).href;
const sqlAssociateCert = new URL("../assets/certifications/sql-associate-certificate.jpg", import.meta.url).href;
const aiDevelopersCert = new URL("../assets/certifications/ai-engineer-for-developers-associate.jpg", import.meta.url).href;
const aiDataScientistsCert = new URL("../assets/certifications/ai-engineer-for-data-scientists-associate.jpg", import.meta.url).href;
const googleCloudInfraCert = new URL("../assets/certifications/elastic-google-cloud-infrastructure-scaling-and-automation.jpg", import.meta.url).href;

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  skills: string[];
  image: string;
}

const certificationsList: Certification[] = [
  {
    id: "mdb-schema",
    title: "Schema Lifecycle Management",
    issuer: "MongoDB",
    date: "Feb 2025",
    credentialId: "MDBb4eit8rmpn",
    verifyUrl: "https://learn.mongodb.com/c/e5KXrorpRtWzhoLZQh00pQ",
    skills: ["MongoDB Schema", "Data Modeling", "NoSQL"],
    image: mongodbSchemaCert,
  },
  {
    id: "mdb-vector",
    title: "Atlas Vector Search for RAG Applications",
    issuer: "MongoDB",
    date: "Feb 2025",
    credentialId: "MDB8uep9h79mk",
    verifyUrl: "https://learn.mongodb.com/c/wQjs-CacSESREKDffv4uNQ",
    skills: ["Atlas Vector Search", "RAG", "MongoDB"],
    image: mongodbVectorSearchCert,
  },
  {
    id: "datacamp-ai-dev",
    title: "AI Engineer for Developers Associate",
    issuer: "DataCamp",
    date: "Jul 2026",
    credentialId: "AIEDA0010711413465",
    verifyUrl: "https://www.datacamp.com/certificate/AIEDA0010711413465",
    skills: ["AI Engineering", "Software Development"],
    image: aiDevelopersCert,
  },
  {
    id: "datacamp-ai-ds",
    title: "AI Engineer for Data Scientists Associate",
    issuer: "DataCamp",
    date: "Jul 2026",
    credentialId: "AEDS0017523298949",
    verifyUrl: "https://www.datacamp.com/certificate/AIEngineerDataScientists",
    skills: ["AI Engineering", "Data Analysis"],
    image: aiDataScientistsCert,
  },
  {
    id: "datacamp-sql",
    title: "SQL Associate Certificate",
    issuer: "DataCamp",
    date: "Jul 2026",
    credentialId: "SQA0013988104032",
    verifyUrl: "https://www.datacamp.com/certificate/SQA0013988104032",
    skills: ["SQL", "Relational Databases"],
    image: sqlAssociateCert,
  },
  {
    id: "gcp-infra",
    title: "Elastic Google Cloud Infrastructure: Scaling & Automation",
    issuer: "DataCamp",
    date: "Jul 2026",
    credentialId: "2c07ca923a2a147543fb2ffea0fa46e9c89d79b3",
    verifyUrl:
      "https://www.datacamp.com/completed/statement-of-accomplishment/course/2c07ca923a2a147543fb2ffea0fa46e9c89d79b3?utm_medium=organic_social&utm_campaign=sharewidget&utm_content=soa",
    skills: ["Google Cloud Platform", "Infrastructure", "Automation"],
    image: googleCloudInfraCert,
  },
];

function CertificatePreviewCard({
  cert,
  onInspect,
}: {
  cert: Certification;
  onInspect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 26,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / (rect.height || 1) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const copyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(cert.credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="pro-card p-5 sm:p-6"
      >
        {/* Document Image */}
        <button
          type="button"
          onClick={onInspect}
          className="group relative w-full aspect-[1.414/1] rounded-lg overflow-hidden bg-zinc-950 border border-white/[0.08] block cursor-zoom-in"
          aria-label={`View ${cert.title} certificate`}
        >
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-full bg-black/80 border border-white/15 text-xs text-white inline-flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand</span>
            </span>
          </div>
        </button>

        {/* Metadata */}
        <div className="mt-5 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-zinc-100 leading-snug">
                {cert.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {cert.issuer} &middot; Issued {cert.date}
              </p>
            </div>
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-zinc-300 hover:text-white shrink-0 transition-colors"
            >
              <span>Verify</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono-jb text-[11px] px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/[0.06]"
                >
                  {skill}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={copyId}
              className="inline-flex items-center gap-1.5 font-mono-jb text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              title="Copy credential ID"
            >
              <span className="truncate max-w-[140px]">ID: {cert.credentialId}</span>
              {copied ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Certifications() {
  const [selectedId, setSelectedId] = useState<string>(certificationsList[0].id);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeCert =
    certificationsList.find((c) => c.id === selectedId) || certificationsList[0];

  return (
    <section id="certifications" className="py-28 relative">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <SectionReveal direction="up" stagger={0.1}>
          <RevealItem>
            <EditorialSectionHeader
              index="03"
              label="Credentials"
              title="Certifications &"
              serifWord="courses."
              subtitle="Completed coursework and verified technical assessments."
            />
          </RevealItem>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left: Interactive Index List with Shared Layout Indicator */}
            <div className="lg:col-span-5">
              <RevealItem direction="left">
                <div className="divide-y divide-white/[0.06] border-y border-white/[0.07]">
                  {certificationsList.map((cert, idx) => {
                    const isSelected = cert.id === activeCert.id;
                    return (
                      <button
                        key={cert.id}
                        onClick={() => setSelectedId(cert.id)}
                        className="relative w-full text-left py-4 px-3 transition-colors cursor-pointer flex items-baseline justify-between gap-3 group"
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="activeCertBg"
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 30,
                            }}
                            className="absolute inset-0 bg-white/[0.04] -z-10"
                          />
                        )}
                        <div className="flex items-baseline gap-3 min-w-0">
                          <span
                            className={`font-mono-jb text-xs ${
                              isSelected ? "text-zinc-200" : "text-zinc-600"
                            }`}
                          >
                            0{idx + 1}
                          </span>
                          <div className="min-w-0">
                            <div
                              className={`text-sm font-medium truncate transition-colors ${
                                isSelected
                                  ? "text-zinc-100"
                                  : "text-zinc-400 group-hover:text-zinc-200"
                              }`}
                            >
                              {cert.title}
                            </div>
                            <div className="text-xs text-zinc-500 mt-0.5">
                              {cert.issuer}
                            </div>
                          </div>
                        </div>

                        <span className="font-mono-jb text-[11px] text-zinc-500 shrink-0">
                          {cert.date}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </RevealItem>
            </div>

            {/* Right: 3D Tilting Certificate Preview */}
            <div className="lg:col-span-7">
              <RevealItem direction="right">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCert.id}
                    initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <CertificatePreviewCard
                      cert={activeCert}
                      onInspect={() => setLightboxOpen(true)}
                    />
                  </motion.div>
                </AnimatePresence>
              </RevealItem>
            </div>
          </div>
        </SectionReveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="cert-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={activeCert.image}
              alt={activeCert.title}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[82vh] object-contain rounded-xl border border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
