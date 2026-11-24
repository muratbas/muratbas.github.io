"use client";

import React from "react";

const EMAIL = "contact@muratbas.com";

export function AboutTab() {
  return (
    <section className="max-w-2xl mx-auto pt-8 sm:pt-14 text-center space-y-5 text-lg sm:text-xl text-[#0A0A0A]">
      <p>hi, i&apos;m murat and i create things. based in Samsun, Turkiye.</p>

      <p>
        if you wanna reach me,{" "}
        <a
          href={`mailto:${EMAIL}`}
          className="font-medium hover:underline underline-offset-4"
        >
          {EMAIL}
        </a>
      </p>

      <div className="pt-4">
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="lowercase underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          resume
        </a>
      </div>
    </section>
  );
}
