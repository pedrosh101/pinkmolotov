"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "../i18n/navigation";
import { useTranslations } from "next-intl";
import useIsDesktop from "../hooks/useIsDesktop";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";

const SHRINK_DISTANCE = 250;
const EASING = 0.08;

const HEADER_MAX = 300;
const HEADER_MIN = 64;
const LOGO_MAX = 540;
const LOGO_MIN = 100;

export default function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const isDesktop = useIsDesktop();
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isHomePage =
    pathname === "/" || pathname === "/en" || pathname === "/pt";
  const shouldShrink = isHomePage && isDesktop;
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("about-section");
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        inline: "end",
        block: "nearest",
      });
    }
    setOpen(false);
  };

  useEffect(() => {
    setIsMounted(true);

    if (!shouldShrink) {
      setProgress(1);
      targetRef.current = 1;
      currentRef.current = 1;
      return;
    }

    const updateTarget = (e: Event) => {
      const target = e.target === document ? window : (e.target as HTMLElement);
      const scrollTop =
        target === window ? window.scrollY : (target as HTMLElement).scrollTop;
      const scrollLeft =
        target === window ? window.scrollX : (target as HTMLElement).scrollLeft;
      const amount = Math.max(scrollTop, scrollLeft);
      targetRef.current = Math.min(amount / SHRINK_DISTANCE, 1);
    };

    const animate = () => {
      currentRef.current += (targetRef.current - currentRef.current) * EASING;
      if (Math.abs(targetRef.current - currentRef.current) < 0.001) {
        currentRef.current = targetRef.current;
      }
      setProgress(currentRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    const currentScroll = Math.max(window.scrollY, window.scrollX);
    const initialProgress = Math.min(currentScroll / SHRINK_DISTANCE, 1);
    targetRef.current = initialProgress;
    currentRef.current = initialProgress;
    setProgress(initialProgress);

    window.addEventListener("scroll", updateTarget, {
      passive: true,
      capture: true,
    });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", updateTarget, true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldShrink]);

  const headerHeight = isMounted
    ? shouldShrink
      ? HEADER_MAX - progress * (HEADER_MAX - HEADER_MIN)
      : HEADER_MIN
    : null;
  const logoHeight = isMounted
    ? shouldShrink
      ? LOGO_MAX - progress * (LOGO_MAX - LOGO_MIN)
      : LOGO_MIN
    : null;

  const menuLinks = (
    <ul className="flex flex-col md:flex-row gap-8 md:gap-12 2xl:gap-16 text-black/80 text-md">
      <li className="border-b border-black/10 md:border-none py-3 md:py-0">
        {isDesktop && isHomePage ? (
          <a
            href="#about-section"
            onClick={handleAboutClick}
            className="hover:text-pink-600/80 block w-full"
          >
            {t("item1")}
          </a>
        ) : (
          <Link
            href="/pink-molotov"
            onClick={() => setOpen(false)}
            className="hover:text-pink-600/80 block w-full"
          >
            {t("item1")}
          </Link>
        )}
      </li>
      <li className="border-b border-black/10 md:border-none py-3 md:py-0">
        <Link
          href="/work"
          onClick={() => setOpen(false)}
          className="hover:text-pink-600/80 block w-full"
        >
          {t("item2")}
        </Link>
      </li>
            <li className="border-b border-black/10 md:border-none py-3 md:py-0">
        <Link
          href="/encomendas"
          onClick={() => setOpen(false)}
          className="hover:text-pink-600/80 block w-full"
        >
          {t("item3")}
        </Link>
      </li>
      <li className="border-b border-black/10 md:border-none py-3 md:py-0">
        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="hover:text-pink-600/80 block w-full"
        >
          {t("item4")}
        </Link>
      </li>

    </ul>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-transparent ${
        !isMounted ? (isHomePage ? "h-75 md:h-75" : "h-16") : ""
      }`}
      style={headerHeight ? { height: `${headerHeight}px` } : {}}
    >
      <div className="relative mx-auto w-full h-full px-4">
        <div className="flex h-full w-full items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt={t("logoAlt")}
              width={650}
              height={650}
              quality={100}
              priority
              className={`w-auto object-contain ${
                !isMounted ? (isHomePage ? "h-25 md:h-135" : "h-25") : ""
              }`}
              style={logoHeight ? { height: `${logoHeight}px` } : {}}
            />
          </Link>
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <div
          className="hidden md:flex absolute right-4 items-center gap-12 font-kyiv 2xl:text-2xl text-xl tracking-wide"
          style={{
            top: `${HEADER_MIN / 2}px`,
            transform: "translateY(-50%)",
          }}
        >
          <nav>{menuLinks}</nav>
          <LanguageSwitcher />
        </div>

        {/* --- MOBILE NAVIGATION --- */}
        <div
          className="flex md:hidden absolute right-4 items-center gap-4"
          style={{
            top: `${HEADER_MIN / 2}px`,
            transform: "translateY(-50%)",
          }}
        >
          <LanguageSwitcher />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="text-black p-1" aria-label={t("openMenu")}>
              <Menu size={28} />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] max-w-sm bg-white p-0 flex flex-col [&>button]:hidden border-l border-black/10"
            >
              <SheetHeader className="h-20 px-6 flex flex-row items-center justify-between border-b border-black/5 space-y-0">
                <SheetTitle>
                  <Link href="/" onClick={() => setOpen(false)}>
                    <Image
                      src="/logo.png"
                      alt={t("logoAlt")}
                      width={150}
                      height={150}
                      className="w-auto h-10 object-contain"
                    />
                  </Link>
                </SheetTitle>
                <SheetClose className="text-black p-1" aria-label={t("closeMenu")}>
                  <X size={24} />
                </SheetClose>
              </SheetHeader>

              <nav className="flex-1 overflow-y-auto px-6 py-6 font-serif">
                {menuLinks}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
