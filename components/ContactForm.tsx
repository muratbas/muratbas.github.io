"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteData";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    const mailtoSubject = encodeURIComponent(
      formData.subject || `Portfolio İletişim: ${formData.name}`
    );
    const mailtoBody = encodeURIComponent(
      `İsim: ${formData.name}\nE-posta: ${formData.email}\n\nMesaj:\n${formData.message}`
    );

    const targetEmail = siteConfig.socials.email.replace("mailto:", "");
    window.location.href = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-stack-lg px-margin-page bg-[#f8fafc] border-t border-[#e2e8f0]/80" id="contact">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-headline-md text-headline-md text-[#0f172a]">
            Bana Ulaşın
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#e2e8f0] rounded-2xl p-6 sm:p-10 shadow-sm space-y-6"
        >
          {submitted && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium animate-in fade-in">
              E-posta uygulamanız açılıyor! Mesajınız doğrudan iletilecektir.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#0f172a] mb-2"
              >
                İsminiz
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#0f172a] focus:outline-none focus:border-[#209CEE] focus:ring-2 focus:ring-[#209CEE]/20 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#0f172a] mb-2"
              >
                E-posta Adresiniz
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#0f172a] focus:outline-none focus:border-[#209CEE] focus:ring-2 focus:ring-[#209CEE]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-[#0f172a] mb-2"
            >
              Konu
            </label>
            <input
              type="text"
              id="subject"
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#0f172a] focus:outline-none focus:border-[#209CEE] focus:ring-2 focus:ring-[#209CEE]/20 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#0f172a] mb-2"
            >
              Mesajınız
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#0f172a] focus:outline-none focus:border-[#209CEE] focus:ring-2 focus:ring-[#209CEE]/20 transition-all resize-y"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white hover:bg-[#209CEE] py-3.5 px-8 rounded-full font-medium text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.99]"
          >
            Gönder
          </button>
        </form>
      </div>
    </section>
  );
}
