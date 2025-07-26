"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { usePathname, useParams, useRouter } from "next/navigation";
import { Pages, Routes, Languages } from "@/constants/enums";
import { motion, easeOut } from "framer-motion";
import clsx from "clsx";
import { Loader } from "lucide-react";
import { useCallback, useMemo } from "react";

interface AuthSectionProps {
  onCloseMenu?: () => void;
}

interface ButtonConfig {
  label: string;
  path: string;
  isActive: boolean;
  variant: "link" | "default";
  ariaLabel: string;
}

function AuthSection({ onCloseMenu }: AuthSectionProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const isArabic = params?.locale === Languages.ARABIC;

  const navigateWithClose = useCallback(
    (path: string) => {
      router.push(path);
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        onCloseMenu?.(); // ✅ يُغلق فقط في الشاشات الصغيرة
      }
    },
    [router, onCloseMenu]
  );
  const handleSignOut = useCallback(async () => {
    try {
      await signOut({ callbackUrl: `/${Routes.ROOT}` });
      onCloseMenu?.();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }, [onCloseMenu]);

  const buttons = useMemo<ButtonConfig[]>(
    () => [
      {
        label: "Login",
        path: `/${Routes.AUTH}${Pages.LOGIN}`,
        isActive:
          pathname?.startsWith(`/${Routes.AUTH}${Pages.LOGIN}`) ?? false,
        variant: "link",
        ariaLabel: "Navigate to login page",
      },
      {
        label: "Sign Up",
        path: `/${Routes.AUTH}${Pages.Register}`,
        isActive:
          pathname?.startsWith(`/${Routes.AUTH}${Pages.Register}`) ?? false,
        variant: "default",
        ariaLabel: "Navigate to sign up page",
      },
    ],
    [pathname]
  );

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: easeOut },
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  if (!pathname) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-rose-500 dark:text-rose-400 font-semibold text-sm p-4 rounded-xl bg-rose-50/50 dark:bg-rose-900/20 backdrop-blur-md"
        role="alert"
        aria-live="assertive"
      >
        Error: Unable to determine current path
      </motion.div>
    );
  }

  if (status === "loading") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center gap-2 p-2"
      >
        <Button
          size="lg"
          disabled
          className="text-base font-semibold rounded-xl px-5 py-3 transition-all duration-300 ease-in-out
          bg-gradient-to-tr from-[#3A29FF] via-[#FF94B4] to-[#FF3232] text-white
          backdrop-blur-xl bg-opacity-80
          shadow-lg hover:shadow-xl shadow-[#3A29FF]/30"
          aria-label="Loading authentication status"
        >
          <Loader className="w-5 h-5 animate-spin mr-2" aria-hidden="true" />
          Loading...
        </Button>
      </motion.div>
    );
  }

  if (session?.user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center gap-2 p-2"
      >
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            className="text-base font-semibold rounded-xl px-5 py-3 transition-all duration-300 ease-in-out
            bg-gradient-to-tr from-[#3A29FF] via-[#FF94B4] to-[#FF3232] text-white
            backdrop-blur-xl bg-opacity-80
            shadow-lg hover:shadow-xl shadow-[#3A29FF]/30
            focus:outline-none focus:ring-2 focus:ring-[#3A29FF]/50"
            size="lg"
            onClick={handleSignOut}
            aria-label="Sign Out"
          >
            Sign Out
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={clsx(
        "flex items-center justify-center gap-4 p-2",
        isArabic ? "flex-row-reverse" : "flex-row"
      )}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {buttons.map(({ label, path, isActive, variant, ariaLabel }) => (
        <motion.div
          key={label}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            className={clsx(
              "text-base font-semibold rounded-xl px-5 py-3 transition-all duration-300 ease-in-out",
              variant === "link"
                ? clsx(
                    "text-[#3A29FF] dark:text-[#FF94B4]",
                    "hover:underline underline-offset-4",
                    "focus:outline-none focus:ring-2 focus:ring-[#3A29FF]/50"
                  )
                : clsx(
                    "bg-gradient-to-tr from-[#3A29FF] via-[#FF94B4] to-[#FF3232] text-white",
                    "hover:brightness-110 hover:scale-[1.02]",
                    "shadow-lg hover:shadow-xl shadow-[#3A29FF]/30",
                    "backdrop-blur-xl bg-opacity-80",
                    "focus:outline-none focus:ring-2 focus:ring-[#3A29FF]/50",
                    isActive && "ring-2 ring-[#FF94B4]"
                  )
            )}
            size="lg"
            variant={variant}
            onClick={() => navigateWithClose(path)}
            aria-label={ariaLabel}
          >
            {label}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default AuthSection;
