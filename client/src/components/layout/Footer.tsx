import React from "react";
import { Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#026E81] to-[#014f5c] dark:from-[#013941] dark:to-[#012c32] text-white py-8 px-4 shadow-inner">
      <div className="container mx-auto text-center space-y-3">
        <h3 className="text-lg font-semibold tracking-wide">
          Built & Designed by{" "}
          <a
            href="https://www.linkedin.com/in/vihashah"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline underline-offset-4 hover:text-teal-200 transition-all duration-300"
          >
            Viha Shah
          </a>
        </h3>

        <div className="flex justify-center gap-3 mt-2">
          <a
            href="https://www.linkedin.com/in/vihashah"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition duration-300"
          >
            <Linkedin size={20} />
          </a>
        </div>

        <p className="text-sm mt-4 opacity-80">
          &copy; {currentYear} CopyIt. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
