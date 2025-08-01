import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";


export const SOCIALS = [
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: "https://instagram.com",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    link: "https://facebook.com",
  },
  {
    name: "Twitter",
    icon: RxTwitterLogo,
    link: "https://twitter.com",
  },
] as const;



export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "YouTube",
        icon: FaYoutube,
        link: "#",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "#",
      },
      {
        name: "Discord",
        icon: RxDiscordLogo,
        link: "#",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://instagram.com",
      },
      {
        name: "Twitter",
        icon: RxTwitterLogo,
        link: "https://twitter.com",
      },
      {
        name: "Linkedin",
        icon: RxLinkedinLogo,
        link: "https://linkedin.com",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "Become Sponsor",
        icon: null,
        link: "#",
      },
      {
        name: "Learning about me",
        icon: null,
        link: "#",
      },
      {
        name: "Contact Me",
        icon: null,
        link: "/schedule",
      },
    ],
  },
] as const;


export const NAV_LINKS = [
  { title: "What we do", link: "#what-we-do" },
  { title: "How it Works", link: "#how-it-works" },
  { title: "Why Syncura Legacy", link: "#why-syncura-legacy" },
  { title: "Case Studies", link: "#case-studies" },
  { title: "Pricing or Plans", link: "#pricing-plans" },
  { title: "About Syncura Legacy", link: "#about" },
] as const;

