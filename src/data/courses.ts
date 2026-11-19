import type { Course, Education } from "../types";

export const education: Education[] = [
  {
    degree: "B.Sc. in Computer Science",
    school: "Lebanese University",
    note: "Graduated 2026",
  },
  {
    degree: "Master’s in AI and Machine Learning (M1)",
    school: "Lebanese University",
    note: "In progress",
  },
];

export const courses: Course[] = [
  {
    title: "DevOps Training",
    provider: "SimpliLearn",
    year: 2025,
    learned:
      "DevOps culture and the CI/CD pipeline, version control, containers and automation tooling.",
  },
  {
    title: "AWS re/Start",
    provider: "AWS",
    year: 2024,
    learned:
      "Cloud fundamentals on AWS core services, Linux, networking and Python scripting.",
  },
  {
    title: "Ambassador on Campus",
    provider: "Hult Prize Foundation",
    year: 2023,
    learned:
      "Promoted the Hult Prize on campus, building leadership, outreach and entrepreneurship skills.",
  },
  {
    title: "Data Collection Certification",
    provider: "AUB",
    year: 2023,
    learned:
      "Research ethics and field data collection protocols for accurate, consistent datasets.",
  },
  {
    title: "Cybersecurity Essentials",
    provider: "Cisco Networking Academy",
    year: 2022,
    learned:
      "Core security concepts: threats, vulnerabilities, defense and securing networks and data.",
  },
  {
    title: "IT Essentials",
    provider: "Cisco Networking Academy",
    year: 2022,
    learned:
      "Hardware, operating systems, networking basics and troubleshooting.",
  },
  {
    title: "Arduino Programming",
    provider: "MAPS",
    year: 2022,
    learned:
      "Programming microcontrollers and working with sensors and electronics.",
  },
];
