"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Copy, Check, ExternalLink, AlertTriangle } from "lucide-react";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Smooth mouse-following ambient beam
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText("https://BriseTech.net");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#07080a] text-zinc-100 overflow-hidden px-6 py-8 selection:bg-brand-cyan/20 selection:text-brand-cyan">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-canvas pointer-events-none opacity-40" />

      {/* Subtle radial spotlight following mouse */}
      {mounted && (
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-30 transition-opacity duration-500"
          style={{
            background: `radial-gradient(650px circle at ${smoothX}px ${smoothY}px, rgba(0, 196, 237, 0.08), rgba(0, 140, 246, 0.04), transparent 80%)`,
          }}
        />
      )}

      {/* Top Bar: Minimalist & Utilitarian */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl flex items-center justify-between z-10 text-xs font-mono text-zinc-500"
      >
        <div className="flex items-center gap-2 tracking-wider uppercase text-[11px] text-zinc-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Planspiel 2026 // TU Chemnitz</span>
        </div>

        <button
          onClick={copyUrl}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-zinc-700/80 transition-all text-zinc-400 hover:text-zinc-200"
          title="Copy URL"
        >
          <span className="tracking-tight font-medium text-xs">BriseTech.net</span>
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                className="text-emerald-400"
              >
                <Check className="w-3.5 h-3.5" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                className="group-hover:text-zinc-200"
              >
                <Copy className="w-3.5 h-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.header>

      {/* Main Hero: Perfectly Centered */}
        <main className="flex-1 flex flex-col items-center justify-center text-center z-10 my-auto py-10 max-w-xl">
          {/* Transparent Logo Container with Mathematically Centered Alignment & Glowing Drop Shadow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-6 flex items-center justify-center"
          >
            {/* Subtle Ambient Radial Backlight */}
            <div className="absolute w-52 h-52 rounded-full bg-gradient-to-tr from-brand-cyan/20 via-brand-blue/15 to-brand-mint/15 blur-3xl opacity-70 pointer-events-none" />

            {/* Transparent Wrapper with Dynamic Glowing Drop Shadow */}
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 18px rgba(0, 196, 237, 0.5)) drop-shadow(0 0 40px rgba(0, 140, 246, 0.35))",
                  "drop-shadow(0 0 28px rgba(0, 196, 237, 0.75)) drop-shadow(0 0 60px rgba(0, 140, 246, 0.5)) drop-shadow(0 0 85px rgba(80, 201, 129, 0.25))",
                  "drop-shadow(0 0 18px rgba(0, 196, 237, 0.5)) drop-shadow(0 0 40px rgba(0, 140, 246, 0.35))",
                ],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center bg-transparent select-none cursor-default"
            >
              <Image
                src="/logo.svg"
                alt="BriseTech Logo"
                width={180}
                height={136}
                priority
                className="h-24 w-auto md:h-28 object-contain transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1.5 mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans">
              BriseTech
            </h1>
            <p className="text-xs sm:text-sm font-mono tracking-wider text-brand-cyan/90 uppercase">
              BriseTech.net
            </p>
          </motion.div>

          {/* Loading Indicator & "Something is cooking!" */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4 w-full mb-8"
          >
            {/* Precision Engineered Loading Mechanism */}
            <div className="relative flex items-center justify-center w-12 h-12">
              {/* Outer dotted orbit */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-zinc-700/60"
              />

              {/* High-speed gradient arc */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-1 rounded-full border-2 border-transparent border-t-brand-cyan border-r-brand-blue"
              />

              {/* Inner pulsing core dot */}
              <motion.div
                animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-brand-cyan to-brand-mint shadow-[0_0_10px_rgba(0,196,237,0.8)]"
              />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-100">
                Something is cooking!
              </h2>
              <p className="text-sm text-zinc-400 max-w-sm font-normal leading-relaxed">
                Our 9-member startup team is shaping the product architecture. Check back soon.
              </p>
            </div>
          </motion.div>

          {/* HIGH-VISIBILITY IMPORTANT RED NOTICE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-lg mx-auto p-4 sm:p-5 rounded-2xl bg-red-950/40 border-2 border-red-500/80 shadow-[0_0_30px_rgba(239,68,68,0.35)] backdrop-blur-md text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2 text-red-400 font-bold tracking-wider text-xs sm:text-sm uppercase font-mono">
              <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse flex-shrink-0" />
              <span>Important Academic Notice</span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-red-100 font-normal leading-relaxed">
              This is <strong className="font-black text-white underline decoration-red-400 decoration-2 underline-offset-2">NOT a real website</strong> and not a real commercial entity. It is an educational university student (Web Engineering) project from the <strong className="font-bold text-white">Technical University of Chemnitz</strong>.
            </p>

            <div className="mt-3.5 flex items-center justify-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-mono font-bold bg-red-900/80 text-red-200 border border-red-500 shadow-sm">
                #myVSR
              </span>
            </div>
          </motion.div>
        </main>

        {/* Bottom Bar: Discreet Copyright & Links */}
        <motion.footer
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 font-mono z-10 pt-6 border-t border-zinc-900/80"
        >
          <div>
            <span>&copy; {new Date().getFullYear()} BriseTech</span>
            <span className="mx-2 text-zinc-700">•</span>
            <span>Planspiel Web Engineering • 9-Member Student Team</span>
          </div>

        <div className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors">
          <a
            href="https://BriseTech.net"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline underline-offset-4"
          >
            <span>visit domain</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </motion.footer>
    </div>
  );
}
