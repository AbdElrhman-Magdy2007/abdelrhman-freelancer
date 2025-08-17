"use client";

import React, { useCallback, useMemo, useEffect, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavLinksProps {
  navItems: NavItem[];
  isMobile?: boolean;
  toggleMobileMenu?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = React.memo(
  ({ navItems, isMobile = false, toggleMobileMenu }) => {
    const pathname = usePathname();
    const [activeHash, setActiveHash] = useState<string>("");

    const hashLinks = useMemo(
      () =>
        navItems.filter(
          (item) => item.href.startsWith("/#") || item.href === "/"
        ),
      [navItems]
    );

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              if (id === "home") {
                setActiveHash("");
              } else {
                setActiveHash(`#${id}`);
              }
            }
          });
        },
        { threshold: 0.6 }
      );

      hashLinks.forEach((item) => {
        const id = item.href === "/" ? "home" : item.href.replace("/#", "");
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      return () => {
        hashLinks.forEach((item) => {
          const id = item.href === "/" ? "home" : item.href.replace("/#", "");
          const el = document.getElementById(id);
          if (el) observer.unobserve(el);
        });
      };
    }, [hashLinks]);

    const normalizePath = useCallback((path: string) => {
      const [basePath, hash] = path.split("#");
      const normalized = basePath.replace(/^\/+/g, "").replace(/\/+$/g, "");
      const cleanPath = normalized === "" ? "/" : `/${normalized}`;
      return hash ? `${cleanPath}#${hash}` : cleanPath;
    }, []);

    const isLinkActive = useCallback(
      (href: string) => {
        const normalizedHref = normalizePath(href);
        const [_, hash] = normalizedHref.split("#");
        const isHashLink = !!hash;

        if (isHashLink) {
          return `#${hash}` === activeHash;
        } else {
          const normalizedPathname = normalizePath(pathname || "/");
          return normalizedHref === normalizedPathname && activeHash === "";
        }
      },
      [pathname, activeHash, normalizePath]
    );

    const activeStates = useMemo(
      () => navItems.map((item) => isLinkActive(item.href)),
      [navItems, isLinkActive]
    );

    // --- Handle Click ---
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (isMobile && toggleMobileMenu) toggleMobileMenu();

        if (href === "/") {
          e.preventDefault();
          window.location.href = "/"; // إعادة تحميل الصفحة الرئيسية مباشرة
          return;
        }

        if (href.startsWith("/#")) {
          e.preventDefault();
          const id = href.replace("/#", "");
          const element = document.getElementById(id);
          if (element) {
            window.history.pushState(null, "", `/#${id}`);
            element.scrollIntoView({ behavior: "smooth" });
            setActiveHash(`#${id}`);
          }
        }
      },
      [isMobile, toggleMobileMenu]
    );

    return (
      <nav
        className={clsx(
          "flex items-center justify-center",
          isMobile
            ? "flex-col gap-4"
            : "gap-6 bg-white/5 backdrop-blur-md rounded-full px-6 py-2"
        )}
        role="navigation"
        aria-label="Main Navigation"
      >
        {navItems.length > 0 ? (
          navItems.map((item, index) => {
            const isActive = activeStates[index];

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <NextLink
                  href={item.href}
                  scroll={false}
                  onClick={(e) => handleClick(e, item.href)}
                  className={clsx(
                    "relative inline-block px-3 py-1 text-sm sm:text-base font-medium transition-all duration-300 rounded-md",
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-300 hover:text-white"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeDot"
                      className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-indigo-400 rounded-md"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </NextLink>
              </motion.div>
            );
          })
        ) : (
          <p className="text-sm text-muted-foreground">
            No navigation items available
          </p>
        )}
      </nav>
    );
  }
);

NavLinks.displayName = "NavLinks";

export default NavLinks;
