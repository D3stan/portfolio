// HelloRotator.jsx
import { useEffect, useMemo, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { SITE_NAME } from "@/config";

/**
 * Rotates "Hello, my name is …" across languages with a flag + 🙂.
 */
export default function HelloRotator({
  name = SITE_NAME,
  interval = 2200,
  className = "",
}) {
  const items = useMemo(
    () => [
      {
        flag: "🇦🇺",
        dir: "ltr",
        style: {
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
        },
        text: `G'day mate, my name is ${name}. 🙂`,
      },
      {
        flag: "🇳🇵",
        dir: "ltr",
        style: { fontFamily: '"Noto Sans Devanagari", Mangal, serif' },
        text: "नमस्ते, मेरो नाम मनोज हो। 🙂",
      },
      {
        flag: "🇮🇳",
        dir: "ltr",
        style: { fontFamily: '"Noto Sans Devanagari", Mangal, serif' },
        text: "नमस्ते, मेरा नाम मनोज है। 🙂",
      },
      {
        flag: "🇯🇵",
        dir: "ltr",
        style: {
          fontFamily:
            '"Noto Sans JP", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
        },
        text: "こんにちは、私の名前はマノジです。🙂",
      },
      {
        flag: "🇰🇷",
        dir: "ltr",
        style: {
          fontFamily:
            '"Noto Sans KR", Apple SD Gothic Neo, Malgun Gothic, sans-serif',
        },
        text: "안녕하세요, 제 이름은 마노지입니다. 🙂",
      },
      {
        flag: "🇨🇳",
        dir: "ltr",
        style: {
          fontFamily:
            '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
        },
        text: `你好，我的名字是 ${name}。🙂`,
      },
      {
        flag: "🇸🇦",
        dir: "rtl",
        style: {
          fontFamily: 'Amiri, "Noto Naskh Arabic", "Scheherazade New", serif',
        },
        text: "مرحبًا، اسمي مانوج. 🙂",
      },
      {
        flag: "🇷🇺",
        dir: "ltr",
        style: { fontFamily: '"PT Sans", "Noto Sans", Arial, sans-serif' },
        text: "Привет, меня зовут Манодж. 🙂",
      },
      {
        flag: "🇪🇸",
        dir: "ltr",
        style: { fontFamily: "Inter, system-ui, sans-serif" },
        text: `Hola, me llamo ${name}. 🙂`,
      },
      {
        flag: "🇫🇷",
        dir: "ltr",
        style: { fontFamily: "Inter, system-ui, sans-serif" },
        text: `Bonjour, je m’appelle ${name}. 🙂`,
      },
      {
        flag: "🇩🇪",
        dir: "ltr",
        style: { fontFamily: "Inter, system-ui, sans-serif" },
        text: `Hallo, ich heiße ${name}. 🙂`,
      },
      {
        flag: "🇵🇹",
        dir: "ltr",
        style: { fontFamily: "Inter, system-ui, sans-serif" },
        text: `Olá, o meu nome é ${name}. 🙂`,
      },
      {
        flag: "🇮🇩",
        dir: "ltr",
        style: { fontFamily: "Inter, system-ui, sans-serif" },
        text: `Halo, nama saya ${name}. 🙂`,
      },
      {
        flag: "🇹🇭",
        dir: "ltr",
        style: { fontFamily: '"Noto Sans Thai", Th Sarabun New, sans-serif' },
        text: `สวัสดี ฉันชื่อ ${name} 🙂`,
      },
      {
        flag: "🇻🇳",
        dir: "ltr",
        style: { fontFamily: "Inter, system-ui, sans-serif" },
        text: `Xin chào, tôi là ${name}. 🙂`,
      },
    ],
    [name]
  );

  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);

  const current = items[i];

  return (
    <div className={`mb-4 ${className}`}>
      {/* MATCHES ABOUT BOX: single border, offset shadow, square corners */}
      <div className="inline-flex max-w-full items-center gap-3 border-2 border-border bg-card px-3 py-2 shadow-[6px_6px_0_var(--shadow-strong)] rounded-none h-[4.5rem] sm:h-[3.5rem] md:h-[4rem]">
        {/* Flag chip – same visual language (single border + small shadow), square */}
        <span
          className="inline-flex h-6 min-w-8 items-center justify-center border-2 border-border bg-accent px-1 leading-none shadow-[4px_4px_0_var(--shadow-strong)] rounded-none flex-shrink-0"
          role="img"
          aria-label="language flag"
        >
          {current.flag}
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            dir={current.dir || "ltr"}
            style={current.style}
            className="text-sm sm:text-base md:text-lg leading-relaxed flex-1"
          >
            {current.text}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
