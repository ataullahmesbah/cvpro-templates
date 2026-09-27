"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Types each word, pauses, deletes it and moves on to the next one. */
export function Typed({ words, className }: { words: string[]; className?: string }) {
  const list = words.filter(Boolean);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!list.length) return;
    const word = list[index % list.length];
    if (reduce) {
      setText(word);
      const t = setTimeout(() => setIndex((i) => i + 1), 2200);
      return () => clearTimeout(t);
    }
    let delay = deleting ? 45 : 95;
    if (!deleting && text === word) delay = 1600;
    if (deleting && text === "") delay = 350;
    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, reduce, list]);

  if (!list.length) return null;
  return (
    <span className={className}>
      <span className="sr-only">{list.join(", ")}</span>
      <span aria-hidden>
        {text}
        <span className="caret ml-0.5 inline-block font-light">|</span>
      </span>
    </span>
  );
}
