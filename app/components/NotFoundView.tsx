"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

type NotFoundViewProps = {
  showBackLink?: boolean;
};

const TITLE_WORDS = ["Web", "ini", "sedang", "dalam", "perbaikan"];

const MAX_TILT = 10;

export default function NotFoundView({ showBackLink = false }: NotFoundViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const digit4Ref = useRef<HTMLSpanElement>(null);
  const digit0Ref = useRef<HTMLSpanElement>(null);
  const digit4bRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Cursor-driven perspective tilt (GSAP quickTo = smooth, no tween spam)
  useEffect(() => {
    const el = tiltRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const quickRotX = gsap.quickTo(el, "rotationX", {
      duration: 0.5,
      ease: "power2.out",
    });
    const quickRotY = gsap.quickTo(el, "rotationY", {
      duration: 0.5,
      ease: "power2.out",
    });

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const xNorm = (x - 0.5) * 2;
      const yNorm = (y - 0.5) * 2;
      quickRotX(-yNorm * MAX_TILT);
      quickRotY(xNorm * MAX_TILT);
    };

    const onLeave = () => {
      quickRotX(0);
      quickRotY(0);
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([digit4Ref.current, digit0Ref.current, digit4bRef.current], {
        opacity: 0,
        scale: 0.92,
        y: 32,
      });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(titleRef.current?.children || [], { opacity: 0, y: 16 });
      gsap.set(descRef.current, { opacity: 0, y: 12 });
      if (showBackLink && linkRef.current)
        gsap.set(linkRef.current, { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(digit4Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
      })
        .to(
          digit0Ref.current,
          { opacity: 1, scale: 1, y: 0, duration: 0.5 },
          "-=0.35"
        )
        .to(
          digit4bRef.current,
          { opacity: 1, scale: 1, y: 0, duration: 0.5 },
          "-=0.35"
        )
        .to(lineRef.current, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, "-=0.2")
        .to(
          titleRef.current?.children || [],
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" },
          0.5
        )
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.85);
      if (showBackLink && linkRef.current)
        tl.to(linkRef.current, { opacity: 1, y: 0, duration: 0.45 }, 1);
    }, containerRef);

    return () => ctx.revert();
  }, [showBackLink]);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 font-sans"
      style={{ perspective: "1200px" }}
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--tw-gradient-from),transparent)] from-neutral-800/50 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23fff' fill-opacity='1' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div
        ref={tiltRef}
        className="relative flex min-h-screen w-full max-w-3xl flex-col items-center justify-center"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        <main className="relative flex min-h-screen w-full flex-col items-center justify-center gap-10 px-6 py-32 text-center">
        {/* 404 */}
        <div className="flex justify-center gap-2 sm:gap-3" aria-hidden>
          <span
            ref={digit4Ref}
            className="inline-block bg-linear-to-b from-neutral-100 to-neutral-500 bg-clip-text text-[clamp(5rem,18vw,11rem)] font-bold tracking-tighter text-transparent"
          >
            4
          </span>
          <span
            ref={digit0Ref}
            className="inline-block bg-linear-to-b from-neutral-100 to-neutral-500 bg-clip-text text-[clamp(5rem,18vw,11rem)] font-bold tracking-tighter text-transparent"
          >
            0
          </span>
          <span
            ref={digit4bRef}
            className="inline-block bg-linear-to-b from-neutral-100 to-neutral-500 bg-clip-text text-[clamp(5rem,18vw,11rem)] font-bold tracking-tighter text-transparent"
          >
            4
          </span>
        </div>

        {/* Line */}
        <div
          ref={lineRef}
          className="h-px w-24 bg-linear-to-r from-neutral-500 to-transparent sm:w-32"
          aria-hidden
        />

        <div className="flex flex-col gap-5">
          <h1
            ref={titleRef}
            className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-2xl font-medium tracking-tight text-neutral-100 sm:text-3xl"
          >
            {TITLE_WORDS.map((word) => (
              <span key={word} className="inline-block">
                {word}
              </span>
            ))}
          </h1>
          <p
            ref={descRef}
            className="max-w-md text-base leading-relaxed text-neutral-500 sm:text-lg"
          >
            Kami sedang memperbarui situs. Silakan cek kembali nanti.
          </p>
        </div>

        {showBackLink && (
          <Link
            ref={linkRef}
            href="/"
            className="group mt-2 flex h-12 items-center justify-center rounded-full border border-neutral-600 bg-neutral-900/80 px-8 text-neutral-200 backdrop-blur-sm transition-colors hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
          >
            Kembali ke Beranda
          </Link>
        )}
        </main>
      </div>
    </div>
  );
}
