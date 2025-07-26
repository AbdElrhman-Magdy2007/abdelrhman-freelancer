"use client";

import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X, LogIn, UserPlus, LogOut, Loader } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "../LanguageProvider";
import NavLinks from "./NavLinks";
import LanguageSelector from "./LanguageSelector";

interface User {
  name: string;
  email: string;
  image?: string;
}

interface NavItem {
  name: string;
  href: string;
}

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  navItems: NavItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = React.memo(
  ({ isMobileMenuOpen, toggleMobileMenu, navItems }) => {
    useLanguage();

    const { data: session, status } = useSession();
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);
    const firstFocusableRef = useRef<HTMLButtonElement>(null);

    // Close on click outside
    const handleClickOutside = useCallback((e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        toggleMobileMenu();
      }
    }, [toggleMobileMenu]);

    // Close on ESC
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        toggleMobileMenu();
      }
    }, [isMobileMenuOpen, toggleMobileMenu]);

    // Navigation + menu close
    const handleNavigation = useCallback((href: string) => {
      router.push(href);
      toggleMobileMenu();
    }, [router, toggleMobileMenu]);

    const handleSignOut = useCallback(() => {
      signOut({ callbackUrl: "/" });
      toggleMobileMenu();
    }, [toggleMobileMenu]);

    // Add event listeners
    useEffect(() => {
      if (isMobileMenuOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        firstFocusableRef.current?.focus();
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isMobileMenuOpen, handleClickOutside, handleKeyDown]);

    const buttonBase = useMemo(
      () =>
        clsx(
          "w-full flex items-center justify-center gap-3 py-4 px-8 rounded-full",
          "text-lg sm:text-xl font-semibold text-white shadow-xl backdrop-blur-md",
          "transition-all duration-300 ease-in-out",
          "focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
        ),
      []
    );

    const gradientBtn = "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600";
    const signOutBtn = "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600";

    return (
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            className="fixed top-0 left-0 w-full h-screen z-[60] bg-black/70 backdrop-blur-xl lg:hidden p-6 sm:p-8 md:p-10"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
          >
            {/* Close button */}
            <div className="flex justify-end">
              <Button
                ref={firstFocusableRef}
                onClick={toggleMobileMenu}
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6 text-white" />
              </Button>
            </div>

            {/* Menu Content */}
            <div className="mt-10 flex flex-col items-center space-y-10">
              <NavLinks
                navItems={navItems}
                isMobile={true}
                toggleMobileMenu={toggleMobileMenu}
              />
              <LanguageSelector />

              {/* Auth Buttons */}
              {status === "loading" ? (
                <div className="flex items-center justify-center w-full">
                  <Loader className="w-10 h-10 animate-spin text-white" />
                </div>
              ) : session?.user ? (
                <div className="text-center w-full space-y-6">
                  {/* Avatar */}
                  <div className="flex flex-col items-center gap-4">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-md object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500 text-3xl font-bold text-white">
                        {session.user.name?.charAt(0) || "U"}
                      </div>
                    )}
                    <div className="text-white">
                      <p className="text-xl font-semibold">{session.user.name}</p>
                      <p className="text-sm text-gray-300">{session.user.email}</p>
                    </div>
                  </div>

                  {/* Sign out button */}
                  <button
                    onClick={handleSignOut}
                    className={clsx(buttonBase, signOutBtn)}
                  >
                    <LogOut className="w-6 h-6" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="text-center w-full space-y-6">
                  <button
                    onClick={() => handleNavigation("/auth/signin")}
                    className={clsx(buttonBase, gradientBtn)}
                  >
                    <LogIn className="w-6 h-6" />
                    Sign In
                  </button>
                  <button
                    onClick={() => handleNavigation("/auth/signup")}
                    className={clsx(buttonBase, gradientBtn)}
                  >
                    <UserPlus className="w-6 h-6" />
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

MobileMenu.displayName = "MobileMenu";
export default MobileMenu;
