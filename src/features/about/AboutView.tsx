"use client";

import React from "react";

export function AboutView() {
  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center text-neutral-900">
      <div className="space-y-4 text-base sm:text-xl md:text-2xl font-normal leading-relaxed tracking-[-0.025em]">
        <p>
          Hi, I&apos;m Murat Bas, i have a degree in Computer Programming and i create things.
        </p>
        <p>
          if you want to contact me{" "}
          <a
            href="mailto:muuratbas@gmail.com"
            className="font-bold text-neutral-950 hover:text-blue-600 transition-colors cursor-pointer underline-offset-4"
          >
            muuratbas@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
