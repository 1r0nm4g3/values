import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

const VALUES = [
  "Achievement",
  "Adventure",
  "Authenticity",
  "Balance",
  "Compassion",
  "Contribution",
  "Creativity",
  "Curiosity",
  "Empathy",
  "Faith",
  "Family",
  "Freedom",
  "Friendship",
  "Growth",
  "Health",
  "Honesty",
  "Humor",
  "Independence",
  "Innovation",
  "Integrity",
  "Justice",
  "Leadership",
  "Learning",
  "Love",
  "Loyalty",
  "Open-mindedness",
  "Optimism",
  "Passion",
  "Patience",
  "Peace",
  "Perseverance",
  "Positivity",
  "Quality",
  "Reliability",
  "Respect",
  "Responsibility",
  "Security",
  "Service",
  "Simplicity",
  "Spirituality",
  "Success",
  "Sustainability",
  "Teamwork",
  "Tradition",
  "Trustworthiness",
  "Wealth",
  "Wellness",
  "Wisdom",
  "Vision",
  "Joy"
];

export function ValueBins() {
  const binRefs = useRef<HTMLDivElement[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [bins, setBins] = useState<string[][]>([[], [], [], []]);
  const value = VALUES[index];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const n = parseInt(e.key);
      if (n >= 1 && n <= 4) {
        handleSelect(n - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  useEffect(() => {
    const el = cardRef.current;
    if (el) {
      el.style.opacity = "0";
      requestAnimationFrame(() => {
        el.style.transition = "opacity 300ms";
        el.style.opacity = "1";
      });
    }
  }, [index]);

  function handleSelect(binIndex: number) {
    const el = cardRef.current;
    const bin = binRefs.current[binIndex];
    if (!el || !bin || !value) return;
    const cardRect = el.getBoundingClientRect();
    const binRect = bin.getBoundingClientRect();
    const dx =
      binRect.left + binRect.width / 2 - (cardRect.left + cardRect.width / 2);
    const dy =
      binRect.top + binRect.height / 2 - (cardRect.top + cardRect.height / 2);
    el.style.transition = "transform 300ms, opacity 300ms";
    el.style.transform = `translate(${dx}px, ${dy}px)`;
    el.style.opacity = "0";
    setTimeout(() => {
      setBins((prev) => {
        const copy = prev.map((arr) => [...arr]);
        copy[binIndex].push(value);
        return copy;
      });
      if (el) {
        el.style.transition = "none";
        el.style.transform = "translate(0,0)";
      }
      setIndex((i) => i + 1);
    }, 300);
  }

  function handleDrop(i: number) {
    handleSelect(i);
  }

  if (!value) {
    return <div className="text-center py-10">All done!</div>;
  }

  return (
    <div className="p-4 space-y-8">
      <div className="grid grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="font-bold mb-2">{i + 1}</div>
            <div
              ref={(el) => {
                if (el) binRefs.current[i] = el;
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(i)}
              className="h-24 w-full border-2 border-dashed rounded flex items-center justify-center"
            >
              {bins[i].length}
            </div>
          </div>
        ))}
      </div>
      <div className="relative h-40">
        <div
          ref={cardRef}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", value)}
          className={cn(
            "absolute left-1/2 -translate-x-1/2 p-4 bg-white rounded shadow transition-transform duration-300"
          )}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
