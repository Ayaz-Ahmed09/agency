"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Direction = 1 | -1;

const WHEEL_THRESHOLD = 44;
const WHEEL_COOLDOWN_MS = 750;
const DRAG_COMMIT_THRESHOLD = 78;
const THROW_OUT_DURATION = 0.62;
const REVEAL_DURATION = 0.7;

/**
 * Drives a full-screen "card stack": one panel visible at a time, wheel/touch/keyboard
 * input throws the active card off-stage and reveals the next one, and inner panel
 * scroll (for content taller than the viewport) is respected before a card change fires.
 */
export function useCardStack(panelCount: number) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);

  const wheelAccum = useRef(0);
  const wheelCooldownUntil = useRef(0);

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);

  const registerPanel = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      panelRefs.current[index] = el;
    },
    []
  );

  const registerContent = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      contentRefs.current[index] = el;
    },
    []
  );

  // Lay out the initial stack: active card on top, the rest hidden behind it.
  useEffect(() => {
    panelRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === activeIndexRef.current) {
        gsap.set(el, { y: 0, scale: 1, opacity: 1, rotate: 0, zIndex: 20, pointerEvents: "auto" });
      } else {
        gsap.set(el, { y: 0, scale: 0.94, opacity: 0, rotate: 0, zIndex: 1, pointerEvents: "none" });
      }
    });
  }, [panelCount]);

  const atContentTop = () => {
    const el = contentRefs.current[activeIndexRef.current];
    return !el || el.scrollTop <= 2;
  };

  const atContentBottom = () => {
    const el = contentRefs.current[activeIndexRef.current];
    return !el || el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
  };

  const goTo = useCallback((nextIndex: number, dir: Direction) => {
    if (isAnimating.current) return;
    if (nextIndex < 0 || nextIndex >= panelCount) return;
    if (nextIndex === activeIndexRef.current) return;

    const current = panelRefs.current[activeIndexRef.current];
    const next = panelRefs.current[nextIndex];
    if (!current || !next) return;

    isAnimating.current = true;
    gsap.set(current, { zIndex: 30 });
    gsap.set(next, { zIndex: 20, pointerEvents: "auto" });

    const throwY = dir === 1 ? "-115%" : "115%";
    const throwRotate = dir === 1 ? -9 : 9;

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(current, { pointerEvents: "none", zIndex: 1 });
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
          isAnimating.current = false;
        },
      })
      .to(current, { y: throwY, rotate: throwRotate, opacity: 0, duration: THROW_OUT_DURATION, ease: "power2.in" }, 0)
      .fromTo(
        next,
        { y: dir === 1 ? "7%" : "-7%", scale: 0.94, opacity: 0, rotate: 0 },
        { y: 0, scale: 1, opacity: 1, duration: REVEAL_DURATION, ease: "power3.out" },
        0.08
      );
  }, [panelCount]);

  const next = useCallback(() => goTo(activeIndexRef.current + 1, 1), [goTo]);
  const prev = useCallback(() => goTo(activeIndexRef.current - 1, -1), [goTo]);
  const goToIndex = useCallback(
    (index: number) => goTo(index, index > activeIndexRef.current ? 1 : -1),
    [goTo]
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = (event: WheelEvent) => {
      if (isAnimating.current) {
        event.preventDefault();
        return;
      }

      const goingForward = event.deltaY > 0;
      const innerCanScroll = goingForward ? !atContentBottom() : !atContentTop();

      if (innerCanScroll) return;

      event.preventDefault();
      wheelAccum.current += event.deltaY;

      if (Date.now() < wheelCooldownUntil.current) return;

      if (Math.abs(wheelAccum.current) > WHEEL_THRESHOLD) {
        if (wheelAccum.current > 0) next();
        else prev();
        wheelAccum.current = 0;
        wheelCooldownUntil.current = Date.now() + WHEEL_COOLDOWN_MS;
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (isAnimating.current) return;
      const touch = event.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY };
      dragDelta.current = 0;
      isDragging.current = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (isAnimating.current || !touchStart.current) return;
      const touch = event.touches[0];
      const dy = touch.clientY - touchStart.current.y;
      const goingForward = dy < 0;
      const innerCanScroll = goingForward ? !atContentBottom() : !atContentTop();

      // Ambiguous small moves near a scroll boundary stay native so a light
      // wobble doesn't accidentally hijack the gesture.
      if (innerCanScroll && Math.abs(dy) < 60) return;
      if (innerCanScroll) return;

      event.preventDefault();
      isDragging.current = true;
      dragDelta.current = dy;

      const current = panelRefs.current[activeIndexRef.current];
      if (current) {
        const dx = touch.clientX - touchStart.current.x;
        const rotate = dx * 0.04 - dy * 0.015;
        const fade = Math.max(1 - Math.abs(dy) / 640, 0.55);
        gsap.set(current, { y: dy, rotate, opacity: fade });
      }
    };

    const onTouchEnd = () => {
      if (!touchStart.current) return;
      const dy = dragDelta.current;
      const current = panelRefs.current[activeIndexRef.current];
      touchStart.current = null;

      if (!isDragging.current) return;
      isDragging.current = false;
      dragDelta.current = 0;

      if (dy <= -DRAG_COMMIT_THRESHOLD && activeIndexRef.current < panelCount - 1) {
        next();
      } else if (dy >= DRAG_COMMIT_THRESHOLD && activeIndexRef.current > 0) {
        prev();
      } else if (current) {
        gsap.to(current, { y: 0, rotate: 0, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.75)" });
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        prev();
      }
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    stage.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [panelCount, next, prev]);

  return {
    stageRef,
    panelRefs,
    registerPanel,
    registerContent,
    activeIndex,
    goToIndex,
    next,
    prev,
  };
}
