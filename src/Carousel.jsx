import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ slides, accentColor, interval = 4500 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const count = slides.length;

  useEffect(() => {
    if (paused || count <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [paused, count, interval]);

  const go = (next) => setIndex((next + count) % count);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        width: "100%",
        background: "#000",
        overflow: "hidden",
        aspectRatio: "16 / 10",
      }}
      className="carousel-frame"
    >
      {slides.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute", inset: 0,
            opacity: i === index ? 1 : 0,
            transition: "opacity 0.6s ease",
            pointerEvents: i === index ? "auto" : "none",
          }}
        >
          <picture>
            <source media="(max-width: 640px)" srcSet={s.mobile} />
            <img
              src={s.desktop}
              alt={s.alt || ""}
              loading={i === 0 ? "eager" : "lazy"}
              decoding={i === 0 ? "auto" : "async"}
              fetchpriority={i === 0 ? "high" : "auto"}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </picture>
        </div>
      ))}

      {count > 1 && (
        <>
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous"
            style={arrowStyle("left")}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="Next"
            style={arrowStyle("right")}
          >
            <ChevronRight size={18} />
          </button>

          <div style={dotsWrap}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === index ? 22 : 7,
                  height: 7,
                  borderRadius: 4,
                  border: "none",
                  cursor: "pointer",
                  background: i === index ? (accentColor || "#fff") : "rgba(255,255,255,0.5)",
                  transition: "width 0.3s, background 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: 10,
  transform: "translateY(-50%)",
  width: 34,
  height: 34,
  borderRadius: "50%",
  background: "rgba(0,0,0,0.45)",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(4px)",
});

const dotsWrap = {
  position: "absolute",
  bottom: 10,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: 6,
  alignItems: "center",
  background: "rgba(0,0,0,0.35)",
  padding: "5px 10px",
  borderRadius: 20,
  backdropFilter: "blur(6px)",
};
