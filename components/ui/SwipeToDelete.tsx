"use client";

import { useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  actions: React.ReactNode;
  actionsWidth?: number;
  onSwipeDelete?: () => void;
}

export default function SwipeToDelete({
  children,
  actions,
  actionsWidth = 90,
  onSwipeDelete,
}: Props) {
  const [translateX, setTranslateX] = useState(0);
  const [open, setOpen] = useState(false);
  const [removing, setRemoving] = useState(false);
  const startX = useRef<number | null>(null);
  const dragging = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const fullSwipeThreshold = 140;

  const handleStart = (clientX: number) => {
    startX.current = clientX;
    dragging.current = true;
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!dragging.current || startX.current === null) return;
    const delta = clientX - startX.current;
    const base = open ? -actionsWidth : 0;
    const next = Math.min(0, base + delta);
    setTranslateX(next);
  };

  const handleEnd = () => {
    dragging.current = false;
    setIsDragging(false);

    if (onSwipeDelete && Math.abs(translateX) > fullSwipeThreshold) {
      setRemoving(true);
      setTimeout(() => onSwipeDelete(), 150);
      return;
    }

    const threshold = actionsWidth * 0.5;
    if (Math.abs(translateX) > threshold) {
      setTranslateX(-actionsWidth);
      setOpen(true);
    } else {
      setTranslateX(0);
      setOpen(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div
        className="absolute inset-y-0 right-0 flex items-stretch"
        style={{ width: actionsWidth }}
      >
        {actions}
      </div>

      <div
        className="relative bg-white transition-all"
        style={{
          transform: `translateX(${translateX}px)`,
          opacity: removing ? 0 : 1,
          transitionDuration: isDragging ? "0ms" : "200ms",
        }}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        onPointerDown={(e) => handleStart(e.clientX)}
        onPointerMove={(e) => dragging.current && handleMove(e.clientX)}
        onPointerUp={handleEnd}
      >
        {children}
      </div>
    </div>
  );
}
