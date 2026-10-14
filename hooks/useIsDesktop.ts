"use client";

import { useEffect, useState } from "react";

/**
 * Retorna true quando a viewport é >= breakpoint (768px = "md" do Tailwind por padrão).
 * Sugestão de local: hooks/useIsDesktop.ts
 */
export default function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const update = () => setIsDesktop(mql.matches);

    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);

  return isDesktop;
}