import React from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../ui/ThemeToggle";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#026E81] to-[#014f5c] dark:from-[#013941] dark:to-[#012c32] text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Brand */}
        <Link
          to="/"
          className="flex flex-col items-start hover:opacity-90 transition-all"
        >
          <span className="text-3xl font-bold tracking-wide bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
            CopyIt
          </span>
          <span className="text-xs mt-1 text-teal-200 dark:text-teal-300 tracking-wide">
            Fast • Simple • Secure
          </span>
        </Link>

        {/* Theme Toggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
