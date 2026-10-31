import { useState } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { SectionReveal, RevealItem, EditorialSectionHeader } from "./SectionReveal";
import emailjs from "@emailjs/browser";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const result = await emailjs.send(
        "service_rfiaf3g",
        "template_zvo0q9i",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString("en-PH", {
            timeZone: "Asia/Manila",
            dateStyle: "long",
            timeStyle: "short",
          }),
        },
        "890cug4PSVe3xgaup"
      );
      console.log("EmailJS success:", result);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <SectionReveal direction="up" stagger={0.1}>
          <RevealItem>
            <EditorialSectionHeader
              index="05"
              label="Contact"
              title="Get in"
              serifWord="touch."
              subtitle="Have a project in mind or want to work together? Send a message below."
            />
          </RevealItem>

          <div className="grid md:grid-cols-12 gap-12 items-start">
            {/* Left Info */}
            <div className="md:col-span-5 space-y-6">
              <RevealItem direction="left">
                <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
                  <div className="py-4">
                    <div className="font-mono-jb text-xs uppercase tracking-wider text-zinc-500 mb-1">
                      Email
                    </div>
                    <a
                      href="mailto:tarimanleonard28@gmail.com"
                      className="text-sm font-medium text-zinc-200 hover:text-white inline-flex items-center gap-1 transition-colors"
                    >
                      <span>tarimanleonard28@gmail.com</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                    </a>
                  </div>

                  <div className="py-4">
                    <div className="font-mono-jb text-xs uppercase tracking-wider text-zinc-500 mb-1">
                      Location
                    </div>
                    <div className="text-sm font-medium text-zinc-200">
                      Cebu City, Philippines
                    </div>
                  </div>

                  <div className="py-4">
                    <div className="font-mono-jb text-xs uppercase tracking-wider text-zinc-500 mb-1">
                      Status
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm text-zinc-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Available for freelancing</span>
                    </div>
                  </div>
                </div>
              </RevealItem>
            </div>

            {/* Right Form */}
            <div className="md:col-span-7">
              <RevealItem direction="right">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-zinc-400 mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 bg-[#0d0d10] border border-white/[0.08] rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-white/25 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-zinc-400 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 bg-[#0d0d10] border border-white/[0.08] rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-white/25 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-zinc-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full px-3.5 py-2.5 bg-[#0d0d10] border border-white/[0.08] rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-white/25 transition-colors resize-none"
                    />
                  </div>

                  {status === "success" && (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Message sent. I&apos;ll get back to you soon.</span>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Failed to send. Please email tarimanleonard28@gmail.com directly.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="pro-btn-primary !py-2.5 !px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{status === "sending" ? "Sending..." : "Send message"}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              </RevealItem>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
