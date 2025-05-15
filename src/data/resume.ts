export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  phone: string;
  discord?: string;
  github?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface PersonalSkill {
  name: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  year: string;
  description: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies?: string[];
  link?: string;
}

export interface Hobby {
  name: string;
  icon?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
}

export interface LeadershipRole {
  role: string;
  organization: string;
  period: string;
  responsibilities: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  personalSkills: PersonalSkill[];
  skills: Skill[];
  education: Education[];
  experiences: Experience[];
  projects: Project[];
  hobbies: Hobby[];
  certifications: Certification[];
  awards: Award[];
  leadership: LeadershipRole[];
  unmentiondSkills: { skill: string; emoji: string; level: number }[];
  availableForHire: boolean;
  resumeUrl: string;
}

// All your personal information can be customized here
const resumeData: ResumeData = {
  personalInfo: {
    name: "Abdelrahman Ayoub",
    title: "AI Engineer - Researcher | Web Developer | Graphic Designer",
    location: "Mansoura Qism 2, Mansoura, Egypt",
    email: "abdalrhmanayoub414@gmail.com",
    linkedin: "abdalrhman-ahmed3350",
    phone: "+201024484974",
    discord: "3BDOAI3",
    github: "3BDO3Ai",
  },
  personalSkills: [
    { name: "Problem-Solving" },
    { name: "Team Leadership" },
    { name: "Research" },
    { name: "Project Management" },
    { name: "Communication" },
    { name: "Innovation" },
  ],
  skills: [
    {
      category: "Programming Languages",
      items: [
        "Python", 
        "SQL",
        "C#",
        "C++",
        "PHP",
        "JavaScript",
        "HTML",
        "CSS"
      ],
    },
    {
      category: "AI & Machine Learning",
      items: [
        "TensorFlow",
        "Keras",
        "PyTorch",
        "Scikit-learn",
        "Hugging Face Transformers",
        "NLTK",
        "SpaCy",
        "Neural Networks",
        "Computer Vision"
      ],
    },
    {
      category: "Data Science",
      items: [
        "Pandas",
        "NumPy",
        "Data Analysis",
        "Data Visualization",
        "NLP",
        "Big Data Analytics"
      ],
    },
    {
      category: "Cloud & Infrastructure",
      items: [
        "Microsoft Azure",
        "Git",
        "GitHub",
        "Visual Studio Code"
      ],
    },
    {
      category: "Hardware & Embedded Systems",
      items: [
        "Arduino",
        "Raspberry Pi",
        "Fritzing",
        "Robotics"
      ],
    },
    {
      category: "Design & Visualization",
      items: [
        "WordPress", 
        "Figma", 
        "Photoshop", 
        "Illustrator", 
        "Power BI"
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Engineering - Artificial Intelligence Engineering",
      institution: "New Mansoura University College of Computer Science and Engineering",
      location: "New Mansoura, Egypt",
      year: "2021 - 2026",
      description:
        "Awarded 4th Top-Ranked Student among other students. Distinctive Cumulative GPA 3.472 out of scale 4 – Equivalent Grade Excellent.",
    },
    {
      degree: "Research Experience",
      institution: "New Mansoura University",
      location: "Egypt",
      year: "2023 - 2024",
      description: "Conducted research on Arabic abstractive text summarization using the Multilingual T5 model. Published findings at the 2024 6th International Conference on Computing and Informatics (ICCI), IEEE.",
    },
  ],
  experiences: [
    {
      title: "Undergraduate Researcher",
      company: "New Mansoura University",
      location: "New Mansoura, Egypt",
      period: "2023 - 2024",
      description: [
        "Conducted research on Arabic abstractive text summarization using the Multilingual T5 model.",
        "Designed and implemented experiments to evaluate the effectiveness of the T5 model in generating high-quality Arabic summaries.",
        "Collaborated with a multidisciplinary team to fine-tune the model for Arabic linguistic structures and optimize performance.",
        "Analyzed model outputs using various evaluation metrics to assess summary coherence, fluency, and informativeness.",
        "Presented findings at the 2024 6th International Conference on Computing and Informatics (ICCI), published by IEEE."
      ],
    },
    {
      title: "Undergraduate Researcher",
      company: "New Mansoura University",
      location: "New Mansoura, Egypt",
      period: "2023 - 2024",
      description: [
        "Conducted a comparative study on Arabic text summarization techniques, evaluating Word Frequency Analysis, K-Means Clustering, and the PageRank Algorithm.",
        "Designed and implemented experiments to assess the performance of these techniques using metrics such as recall, precision, F1 score, compression ratio, and population standard deviation.",
        "Analyzed the effectiveness of each method in achieving optimal summary quality and information retention.",
        "Contributed to the development of insights into improving Arabic text summarization for diverse applications.",
        "Presented research findings at the 2024 International Mobile, Intelligent, and Ubiquitous Computing Conference (MIUCC), published by IEEE."
      ],
    },
    {
      title: "Technology Director",
      company: "NMU Student Union",
      location: "New Mansoura, Egypt",
      period: "2024 - 2025",
      description: [
        "Managed technological aspects of the union, overseeing digital transformation and IT operations.",
        "Led the media team, ensuring effective communication and branding across various platforms.",
        "Collaborated with other departments to implement innovative solutions for student engagement.",
        "Organized technical events and workshops to enhance student skills and knowledge.",
        "Developed digital resources and tools to support student activities and initiatives."
      ],
    },
    {
      title: "Head of Programmers Committee",
      company: "Innovators Club",
      location: "New Mansoura University",
      period: "2021 - 2025",
      description: [
        "Led the Programmers Committee to organize coding workshops, mentor students, and develop technical projects.",
        "Coordinated programming competitions and hackathons to stimulate innovation and problem-solving skills.",
        "Provided technical guidance and support to club members on various programming projects.",
        "Facilitated knowledge sharing sessions and collaborative learning environments.",
        "Established partnerships with industry professionals for workshops and guest lectures."
      ],
    },
  ],
  projects: [
    {
      title: "Arabic Speech Recognition in Egyptian Dialect",
      description:
        "Developed an Arabic speech recognition system tailored to the Egyptian dialect using deep learning and natural language processing techniques. Trained models on extensive audio datasets to accurately transcribe spoken Egyptian Arabic into text, and fine-tuned speech-to-text algorithms for improved recognition of colloquial expressions and dialect-specific nuances.",
      technologies: ["Python", "TensorFlow", "NLP", "Deep Learning", "Speech Recognition", "Audio Processing"],
      link: "",
    },
    {
      title: "AGRIBOT",
      description:
        "Designed and developed AGRIBOT, a robot for detecting plant diseases and analyzing soil conditions using computer vision and embedded systems. Integrated neural network models to classify plant diseases and assess soil health in real-time for precision agriculture applications.",
      technologies: ["Computer Vision", "Neural Networks", "Arduino", "Raspberry Pi", "Python", "IoT"],
      link: "",
    },
    {
      title: "Arabic Abstractive Summarization",
      description:
        "Co-led the development of an Arabic Abstractive Summarization model using the MT5 architecture to generate concise and accurate text summaries. Utilized advanced NLP and deep learning techniques to improve summarization beyond traditional extractive approaches.",
      technologies: ["PyTorch", "Hugging Face Transformers", "MT5", "NLP", "Deep Learning", "Python"],
      link: "",
    },
    {
      title: "E-Correspondence System",
      description:
        "Built a custom e-correspondence system to streamline communication for 12 university departments, reducing email handling by 40%. Implemented secure user authentication and role-based access controls, and integrated with existing systems for automated notifications and improved document tracking.",
      technologies: ["Web Development", "Database Design", "User Authentication", "API Integration", "JavaScript"],
      link: "",
    },
    {
      title: "Brain Tumour Detection",
      description:
        "Developed a CNN-based program to detect brain tumors from MRI images with 90% accuracy. Applied image preprocessing techniques such as normalization and augmentation to enhance detection accuracy, and collaborated with fellow students to fine-tune and deploy the program.",
      technologies: ["Python", "TensorFlow", "CNN", "Image Processing", "Machine Learning", "Medical Imaging"],
      link: "",
    },
  ],
  hobbies: [
    { name: "AI Research", icon: "brain" },
    { name: "Programming", icon: "code" },
    { name: "Robotics", icon: "robot" },
    { name: "Reading", icon: "book" },
    { name: "Design", icon: "pencil" },
    { name: "Leadership", icon: "users" }
  ],
  certifications: [
    {
      name: "Microsoft Azure AI Fundamentals",
      issuer: "Microsoft",
      date: "2024"
    },
    {
      name: "Microsoft C# Code",
      issuer: "Microsoft",
      date: "2024"
    },
    {
      name: "AI on Azure",
      issuer: "Microsoft",
      date: "2024"
    },
    {
      name: "Azure Machine Learning",
      issuer: "Microsoft",
      date: "2024"
    },
    {
      name: "Introduction to Artificial Intelligence",
      issuer: "SkillUp",
      date: "2024"
    },
    {
      name: "Foundations of Digital Marketing",
      issuer: "Google & The Open University",
      date: "2024"
    }
  ],
  awards: [
    {
      title: "1st Place - Benha Hackathon",
      issuer: "New Mansoura University",
      date: "February 2025"
    },
    {
      title: "Best Team - Finology Competition",
      issuer: "New Mansoura University",
      date: "March 2025"
    },
    {
      title: "Top 4 Nationally - Huawei ICT Competition (Innovation Track)",
      issuer: "New Mansoura University",
      date: "March 2024"
    },
    {
      title: "5th Place - Benha Hackathon",
      issuer: "New Mansoura University",
      date: "February 2024"
    },
    {
      title: "15th Place - ICMTC AI Competition",
      issuer: "New Mansoura University",
      date: "July 2023"
    }
  ],
  leadership: [
    {
      role: "Technology Director",
      organization: "NMU Student Union",
      period: "2024 - 2025",
      responsibilities: [
        "Managed technological aspects of the union",
        "Led the media team",
        "Oversaw digital transformation"
      ]
    },
    {
      role: "Head of Graphic Design Team",
      organization: "Initiative Student Union",
      period: "2022 - 2025",
      responsibilities: [
        "Led the design team",
        "Created engaging materials for university events",
        "Ensured brand consistency"
      ]
    },
    {
      role: "Head of Programmers Committee",
      organization: "Innovators Club",
      period: "2021 - 2025",
      responsibilities: [
        "Led coding workshops",
        "Mentored students",
        "Developed technical projects"
      ]
    }
  ],
  unmentiondSkills: [
    { skill: "Research & Publication", emoji: "📚", level: 5 },
    { skill: "Leadership", emoji: "👥", level: 5 },
    { skill: "Technical Writing", emoji: "📝", level: 4 },
    { skill: "Public Speaking", emoji: "🎤", level: 4 },
    { skill: "Problem Solving", emoji: "🧩", level: 5 }
  ],
  availableForHire: true,
  resumeUrl:
    "/Abdelrahman_Ayoub_CV.pdf",
};

export default resumeData;
