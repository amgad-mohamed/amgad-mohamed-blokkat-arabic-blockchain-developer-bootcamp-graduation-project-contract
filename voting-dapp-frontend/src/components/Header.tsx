"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { VoteIcon, MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/shared/Button";
import CustomConnectButton from "./CustomConnectButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav
      ref={menuRef}
      className="w-full bg-[#f7f5fe56] py-3 px-4 sm:px-6 md:px-10 lg:px-20 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 relative z-20"
    >
      {/* Logo and mobile toggle */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-[#9084df]"
        >
          <VoteIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          <span>VotePulse</span>
        </Link>
        <button
          className="sm:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <XIcon className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Menu items */}
      <div
        className={`${
          isMenuOpen
            ? "flex bg-white shadow-2xl py-5 gap-4 md:bg-transparent"
            : "hidden"
        } sm:flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 w-full px-20 sm:w-auto absolute sm:static top-[100%] right-0 sm:px-0 py-2 sm:py-0 transform transition-transform duration-600 rounded-b-lg ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } sm:translate-y-0 z-10`}
      >
        <Link href="/polls" className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            View Polls
          </Button>
        </Link>
        <Link href="/create-poll" className="w-full sm:w-auto">
          <Button
            variant="customBlue"
            size="sm"
            className="w-full sm:w-auto text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            Create Poll
          </Button>
        </Link>

        <div className="w-full " onClick={() => setIsMenuOpen(false)}>
          {/* <appkit-button /> */}
        </div>
        <CustomConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
