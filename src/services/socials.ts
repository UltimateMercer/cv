import {
  BehanceLogo,
  Browser,
  Envelope,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  MediumLogo,
} from "@phosphor-icons/react";

const links = {
  website: "http://ultimatemercer.com",
  email: "juliancunha2010@gmail.com",
  github: "https://github.com/UltimateMercer",
  linkedin: "https://www.linkedin.com/in/ultimatemercer/",
  behance: "https://www.behance.net/ultimatemercer",
  medium: "https://medium.com/@ultimatemercer",
  instagram: "",
};

export const socials = [
  {
    name: "Website",
    link: links.website,
    icon: Browser,
    printable: true,
  },
  {
    name: "Email",
    link: links.email,
    icon: Envelope,
    printable: true,
  },
  {
    name: "Github",
    link: links.github,
    icon: GithubLogo,
    printable: true,
  },
  {
    name: "Linkedin",
    link: links.linkedin,
    icon: LinkedinLogo,
    printable: true,
  },
  {
    name: "Behance",
    link: links.behance,
    icon: BehanceLogo,
    printable: true,
  },
  {
    name: "Medium",
    link: links.medium,
    icon: MediumLogo,
    printable: true,
  },
  {
    name: "Instagram",
    link: links.instagram,
    icon: InstagramLogo,
    printable: false,
  },
];
