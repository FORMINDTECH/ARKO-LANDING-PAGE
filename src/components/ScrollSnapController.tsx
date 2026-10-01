"use client";

import { useEffect, useRef } from "react";

const HEADER_OFFSET = 64; // 4rem sticky header
const SCROLL_DURATION_MS = 850;
const WHEEL_THRESHOLD = 12;
const TRAVEL_EPSILON = 4;
const MIN_POINT_GAP = 120; // ignore a bottom-aligned point too close to the section's top

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function ScrollSnapController() {
  const isAnimating = useRef(false);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const getSnapPoints = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("section[data-snap]")
      );
      const vh = window.innerHeight;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const points = new Set<number>();

      points.add(0);
      sections.forEach((el) => {
        const top = Math.max(0, el.offsetTop - HEADER_OFFSET);
        const clampedTop = Math.min(top, maxScroll);
        points.add(clampedTop);

        const bottomAligned = Math.max(
          0,
          Math.min(el.offsetTop + el.offsetHeight - vh, maxScroll)
        );
        if (bottomAligned - clampedTop > MIN_POINT_GAP) {
          points.add(bottomAligned);
        }
      });

      return Array.from(points).sort((a, b) => a - b);
    };

    const goTo = (target: number) => {
      isAnimating.current = true;
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);

      const start = window.scrollY;
      const distance = target - start;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1);
        const eased = easeInOutCubic(progress);
        window.scrollTo({
          top: start + distance * eased,
          behavior: "instant" as ScrollBehavior,
        });

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          isAnimating.current = false;
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const step = (direction: 1 | -1) => {
      const points = getSnapPoints();
      const current = window.scrollY;

      if (direction === 1) {
        const next = points.find((p) => p > current + TRAVEL_EPSILON);
        if (next !== undefined) goTo(next);
        return;
      }

      const prevCandidates = points.filter((p) => p < current - TRAVEL_EPSILON);
      const prev = prevCandidates[prevCandidates.length - 1];
      if (prev !== undefined) goTo(prev);
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
      e.preventDefault();
      step(e.deltaY > 0 ? 1 : -1);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isAnimating.current) return;

      if (e.key === "PageDown") {
        e.preventDefault();
        step(1);
      } else if (e.key === "PageUp") {
        e.preventDefault();
        step(-1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return null;
}
