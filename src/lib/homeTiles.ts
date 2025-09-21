export type HomeTile = {
  title: string;
  href: string;       // internal route or external URL
  img: string;        // path under /public
  alt: string;
  external?: boolean; // open in new tab if true
  banner?: boolean;   // use wide banner aspect
};

export const HOME_TILES: HomeTile[] = [
  { title: "Header", href: "/about", img: "/images/Header.png", alt: "Eir & Wild banner", banner: true },
  { title: "About Me", href: "/about", img: "/images/About Me.png", alt: "About Lara" },
  { title: "Our Story", href: "/ourstory", img: "/images/Our Story.png", alt: "Our Story" },

  { title: "Motherhood Classes", href: "/timetable?tab=motherhood", img: "/images/Motherhood.png", alt: "Motherhood classes" },
  { title: "Womanhood Classes", href: "/timetable?tab=womanhood", img: "/images/Womanhood.png", alt: "Womanhood classes" },
  { title: "Baby Massage", href: "/baby-massage", img: "/images/Baby Massage.png", alt: "Baby massage" },

  { title: "Personal Training", href: "/personal-training", img: "/images/PT.png", alt: "Personal training" },
  { title: "Online Classes", href: "/online-classes", img: "/images/Online Classes.png", alt: "Online classes" },
  { title: "One Off Classes", href: "/one-off-classes", img: "/images/One Off.png", alt: "One-off classes" },

  { title: "Doula Services", href: "/doula", img: "/images/Doula.png", alt: "Doula services" },
  { title: "Reviews", href: "/reviews", img: "/images/Reviews.png", alt: "Customer reviews" },
  { title: "Contact", href: "/contact", img: "/images/Contact.png", alt: "Contact Eir & Wild" },
  { title: "FAQ", href: "/faq", img: "/images/FAQ.png", alt: "Frequently asked questions" },
];
