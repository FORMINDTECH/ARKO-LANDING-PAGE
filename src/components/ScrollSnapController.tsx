"use client";

import { useEffect, useRef } from "react";

const HEADER_OFFSET = 64; // 4rem sticky header
const ANIMATION_LOCK_MS = 650;
const WHEEL_THRESHOLD = 12;
const TRAVEL_EPSILON = 4;

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

export default function ScrollSnapController() {
  const isAnimating = useRef(false);
  const unlockTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

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
        points.add(Math.min(top, maxScroll));
        const bottomAligned = el.offsetTop + el.offsetHeight - vh;
        if (el.offsetHeight > vh - HEADER_OFFSET) {
          points.add(Math.max(0, Math.min(bottomAligned, maxScroll)));
        }
      });

      return Array.from(points).sort((a, b) => a - b);
    };

    const goTo = (target: number) => {
      isAnimating.current = true;
      window.scrollTo({ top: target, behavior: "smooth" });
      window.clearTimeout(unlockTimer.current);
      unlockTimer.current = window.setTimeout(() => {
        isAnimating.current = false;
      }, ANIMATION_LOCK_MS);
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
      window.clearTimeout(unlockTimer.current);
    };
  }, []);

  return null;
}
