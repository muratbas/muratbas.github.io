export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
  link: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export const siteConfig = {
  name: "Murat Baş",
  title: "Murat Baş - Portfolio",
  role: "Full-Stack Web Developer & Game Creator",
  bio: "Building scalable web applications, interactive 2D multiplayer games, and exploring data science.",
  about: {
    paragraph1:
      "With a degree in Computer Programming, I bring a structured approach to problem-solving and software architecture. My passion lies at the intersection of robust backend systems and engaging, intuitive frontend user experiences.",
    paragraph2:
      "Whether I'm architecting a scalable web application or designing intricate mechanics for a 2D multiplayer game, I strive for precision and elegance in every line of code. I believe in continuous learning, currently expanding my expertise into data science and machine learning to build more intelligent digital products.",
    portraitImage: "/images/portrait.png",
  },
  resumeUrl: "/Murat_Bas_CV.pdf",
  socials: {
    github: "https://github.com/muratbas",
    linkedin: "https://www.linkedin.com/in/muratbas1/",
    email: "mailto:muuratbas@gmail.com",
  },
  skills: [
    {
      title: "Web Development",
      icon: "language",
      skills: ["React", "Next.js", "TypeScript", "Node.js", "TailwindCSS", "Firebase"],
    },
    {
      title: "Game Development",
      icon: "sports_esports",
      skills: ["Godot Engine", "2D Mechanics", "Multiplayer Networking"],
    },
    {
      title: "Data & AI",
      icon: "data_object",
      skills: ["Python", "Pandas", "TensorFlow", "Keras"],
    },
  ] as SkillCategory[],
  projects: [
    {
      id: "hotel-management",
      title: "Hotel Management System",
      description:
        "A comprehensive TypeScript tracking application designed for efficient room and customer management. Features real-time availability updates and streamlined booking workflows.",
      image: "/images/hotel-management.png",
      alt: "A sleek dashboard for a hotel management system",
      tags: ["TypeScript", "React"],
      link: "#",
    },
    {
      id: "time-is-up",
      title: "Time is UP!",
      description:
        "Fast-paced 2D multiplayer arena game built with Godot. Features intricate bomb mechanics, physics-based knockbacks, and seamless networking for competitive gameplay.",
      image: "/images/time-is-up.png",
      alt: "Screenshot of 2D multiplayer game created in Godot",
      tags: ["Godot", "Multiplayer"],
      link: "#",
    },
    {
      id: "omu-forum",
      title: "omu.muratbas.com",
      description:
        "A full-stack university community forum designed to foster student engagement. Features real-time discussions, user profiles, and a robust backend architecture.",
      image: "/images/omu-forum.png",
      alt: "Community forum web interface",
      tags: ["Next.js", "Node.js"],
      link: "#",
    },
  ] as Project[],
};
