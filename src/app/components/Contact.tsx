import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { SectionReveal, RevealItem } from "./SectionReveal";
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
      console.error("EmailJS error:", err); // <-- open browser console to see the real error
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "tarimanleonard28@gmail.com", href: "mailto:tarimanleonard28@gmail.com" },
    { icon: Phone, label: "Phone", value: "+9658247857", href: "tel:09658247857" },
    { icon: MapPin, label: "Location", value: "Cebu City, Cebu", href: null },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 relative">
        <SectionReveal direction="up" stagger={0.12} className="max-w-5xl mx-auto">
          <RevealItem>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
              Get In{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-lg text-zinc-400 mb-16 text-center max-w-2xl mx-auto font-mono-jb text-[15px]">
              Have a project in mind or just want to chat? Feel free to reach out!
            </p>
          </RevealItem>

          <div className="grid md:grid-cols-2 gap-12">
            <RevealItem direction="left">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
                <div className="space-y-6 mb-8">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-[0_0_16px_rgba(139,92,246,0.4)]">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500 mb-1">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="neon-icon text-zinc-200 transition-colors font-mono-jb">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-zinc-200 font-mono-jb">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed font-mono-jb">
                  {"I'm always interested in hearing about new projects and opportunities. "}
                  {"Whether you have a question or just want to say hi, I'll try my best to get back to you!"}
                </p>
              </div>
            </RevealItem>

            <RevealItem direction="right">
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { id: "email", label: "Email", type: "email", placeholder: "your.email@example.com" },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm text-zinc-400 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={handleChange}
                      required
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-sm text-zinc-400 mb-2">
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-all resize-none"
                  />
                </div>

                {/* Status messages */}
                {status === "success" && (
                  <p className="text-green-400 text-sm text-center">✅ Message sent successfully!</p>
                )}
                {status === "error" && (
                  <p className="text-red-400 text-sm text-center">❌ Failed to send. Check the browser console for details.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="neon-btn w-full px-8 py-3 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </RevealItem>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}