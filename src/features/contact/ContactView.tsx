"use client";

import React, { useState } from "react";
import { MailIcon, CopyIcon, CheckIcon, ExternalLinkIcon } from "@/components/ui/Icons";

export function ContactView() {
  const [copied, setCopied] = useState(false);
  const email = "muuratbas@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-14 text-neutral-900 text-center">
      {/* Availability Status Pill */}
      <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-tight uppercase mb-8">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>AVAILABLE FOR SELECT COMMISSIONS &amp; TECH ADVISORY (2026)</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 mb-6">
        Let&apos;s build something memorable.
      </h1>

      <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl mx-auto mb-10">
        Whether you are interested in a software architecture consultation, bespoke creative engineering, or an editorial art commission, feel free to drop a line.
      </p>

      {/* Email Copy Card */}
      <div className="bg-neutral-50 p-6 sm:p-8 border border-neutral-200 max-w-md mx-auto mb-12">
        <span className="text-xs font-bold tracking-[-0.02em] uppercase text-neutral-400 block mb-3">
          DIRECT EMAIL INBOX
        </span>
        <div className="flex items-center justify-between bg-white border border-neutral-300 p-3 sm:p-4 rounded-xs">
          <span className="text-sm sm:text-base font-mono font-medium text-neutral-900 truncate">
            {email}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="ml-3 p-2 text-neutral-500 hover:text-blue-600 hover:bg-neutral-100 rounded-sm transition-colors cursor-pointer"
            aria-label="Copy email address"
          >
            {copied ? (
              <span className="flex items-center text-emerald-600 text-xs font-semibold tracking-tight">
                <CheckIcon className="w-4 h-4 mr-1" /> COPIED
              </span>
            ) : (
              <CopyIcon className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="mt-4">
          <a
            href={`mailto:${email}`}
            className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 bg-neutral-950 text-white text-xs font-semibold tracking-tight uppercase hover:bg-blue-600 transition-colors cursor-pointer"
          >
            <MailIcon className="w-4 h-4" />
            <span>OPEN EMAIL CLIENT</span>
          </a>
        </div>
      </div>

      {/* Social Links & Location */}
      <div className="pt-6 border-t border-neutral-200">
        <span className="text-xs font-bold tracking-[-0.02em] uppercase text-neutral-400 block mb-4">
          CHANNELS &amp; PRESENCE
        </span>
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold tracking-[-0.02em] uppercase text-neutral-700">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 hover:text-blue-600 transition-colors"
          >
            <span>GITHUB</span>
            <ExternalLinkIcon className="w-3.5 h-3.5 text-neutral-400" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 hover:text-blue-600 transition-colors"
          >
            <span>TWITTER / X</span>
            <ExternalLinkIcon className="w-3.5 h-3.5 text-neutral-400" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 hover:text-blue-600 transition-colors"
          >
            <span>LINKEDIN</span>
            <ExternalLinkIcon className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>
        <p className="mt-6 text-xs tracking-[-0.02em] uppercase text-neutral-400">
          BASE: ISTANBUL, TURKEY (UTC+3) • WORKING REMOTELY WORLDWIDE
        </p>
      </div>
    </section>
  );
}
