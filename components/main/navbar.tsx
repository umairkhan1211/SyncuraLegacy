'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { NAV_LINKS, SOCIALS } from "@/constants";

// Assuming you have a path for your new calendly page, e.g., /schedule
const CALENDLY_PAGE_PATH = "/schedule";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10">
      {/* Navbar Container */}
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Logo + Name */}
        <Link
          href="/"
          className="flex items-center"
        >
          <Image
            src="/white.png"
            alt="Logo"
            width={50}
            height={50}
            draggable={false}
            className="cursor-pointer"
          />
          <div className="text-lg md:text-xl w-[200px] text-extrabold md:flex md:selffont-bold ml-[10px] text-white md:text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500  ">SynCuraLegacy</div>
        </Link>

        {/* Web Navbar */}
        <div className="hidden md:flex w-[800px] h-full flex-row space-x-3 items-center justify-between md:mr-2 px-1 py-6">
          <div className="flex items-center justify-between w-full h-auto border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.57)] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-xs"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Social Icons (Web) and Set Meeting Button */}
        <div className="hidden md:flex flex-row items-center gap-5"> {/* Added items-center here */}
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
            >
              <Icon className="h-6 w-6 text-white" />
            </Link>
          ))}
          {/* Set Meeting Button */}
          <Link href={CALENDLY_PAGE_PATH}>
            <button className="px-3 py-2 text-sm rounded-full text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition duration-300 ease-in-out shadow-lg whitespace-nowrap">
              Set Meeting
            </button>
          </Link>

        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-white focus:outline-none text-4xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-[#030014] p-5 flex flex-col items-center text-gray-300 md:hidden">
          {/* Links */}
          <div className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            {/* Set Meeting Button for Mobile */}
            <Link href={CALENDLY_PAGE_PATH}>
              <button
                className="mt-4 px-4 py-2 rounded-full text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition duration-300 ease-in-out shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Set Meeting
              </button>
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-6">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
              >
                <Icon className="h-8 w-8 text-white" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
