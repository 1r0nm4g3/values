import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import { VALUES_LIST } from "../data";
import { submitBins } from "../api";

export function ValueBins() {
  const binRefs = useRef<HTMLDivElement[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [bins, setBins] = useState<string[][]>([[], [], [], []]);
  const [animating, setAnimating] = useState(false);
  const value = VALUES_LIST[index];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const n = parseInt(e.key);
      if (n >= 1 && n <= 4) {
        handleSelect(n - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, animating]);

  useEffect(() => {
    const el = cardRef.current;
    if (el) {
      el.style.opacity = "0";
      requestAnimationFrame(() => {
        el.style.transition = "opacity 300ms";
        el.style.opacity = "1";
      });
      // allow next interaction after fade-in completes
      const timer = setTimeout(() => setAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [index]);

  function handleSelect(binIndex: number) {
    if (animating) return;
    setAnimating(true);
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

  const progress = (index / VALUES_LIST.length) * 100;

  useEffect(() => {
    if (!value) {
      const items = bins.flatMap((b, i) => b.map(v => ({ value: v, bin: i + 1 })))
      submitBins(items)
    }
  }, [value])

  if (!value) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-100 p-4">
        <div className="h-2 w-full bg-gray-200 rounded">
          <div
            className="h-full bg-blue-500 rounded transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-10">All done!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <div className="p-4">
        <div className="h-2 w-full bg-gray-200 rounded">
          <div
            className="h-full bg-blue-500 rounded transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div
          ref={cardRef}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", value)}
          className={cn(
            "p-6 bg-slate-50 rounded-xl shadow-lg text-2xl font-semibold transition-transform duration-300"
          )}
        >
          {value}
        </div>
      </div>
      <div className="p-4 grid grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="font-bold mb-2">{i + 1}</div>
            <div
              ref={(el) => {
                if (el) binRefs.current[i] = el;
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(i)}
              className="h-32 w-full border-2 border-dashed border-slate-400 rounded flex items-center justify-center bg-slate-200/50"
            >
              {bins[i].length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
