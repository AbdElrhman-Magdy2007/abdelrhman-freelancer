"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { User, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";

import Logo from "./header/Logo";
import NavLinks from "./header/NavLinks";
import AuthSection from "./header/AuthSection";

interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

const Header: React.FC = React.memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  // Scroll effect
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Navigation links
  const navItems: NavItem[] = useMemo(() => {
    const items: NavItem[] = [
      { name: "Home", href: "/" },
      { name: "Expertise", href: "/#Expertise" },
      { name: "Skills", href: "/#skills" },
      { name: "Code", href: "/#Code" },
      { name: "Projects", href: "/projects" },
      { name: "Contact", href: "/#contact" },
    ];

    if (session?.user) {
      items.push({
        name: "Profile",
        href: "/profile",
        icon: <User className="w-4 h-4 mr-1 inline-block" />,
      });
    }

    return items;
  }, [session]);

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delayChildren: 0.25,
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/5 backdrop-blur-2xl py-2 shadow-md border-b border-white/10"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto max-w-screen-2xl px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div variants={childVariants} whileHover={{ scale: 1.03 }}>
          <Logo />
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          variants={childVariants}
          className="hidden lg:flex items-center space-x-8"
        >
          <NavLinks navItems={navItems} toggleMobileMenu={toggleMobileMenu} />
          <motion.div whileHover={{ scale: 1.05 }}>
            <AuthSection onCloseMenu={toggleMobileMenu} />
          </motion.div>
        </motion.nav>

        {/* Mobile Button */}
        <motion.div variants={childVariants} className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-md"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            className="absolute top-full inset-x-0 w-[95%] max-w-md mx-auto mt-2 p-6 rounded-2xl bg-background/90 border border-white/10 shadow-lg backdrop-blur-2xl flex flex-col gap-6"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <NavLinks
              navItems={navItems}
              isMobile
              toggleMobileMenu={toggleMobileMenu}
            />
            <div className="pt-4 border-t border-white/10">
              <AuthSection
                variant="compact"
                theme="purple"
                glow="soft"
                enableRipple
                showIcons
                buttonSize="md"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
});

Header.displayName = "Header";

export default Header;
