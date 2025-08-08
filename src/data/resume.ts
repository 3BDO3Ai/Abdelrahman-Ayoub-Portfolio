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
    title: "AI Engineer | Researcher | Web Developer | Graphic Designer",
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
        "TypeScript",
        "HTML",
        "CSS",
        "Django"
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
        "LangChain",
        "OpenAI/Azure AI Integration",
        "NLTK",
        "SpaCy",
        "Neural Networks",
        "Computer Vision",
        "Emotion Recognition",
        "Speech Recognition",
        "Adaptive Learning Systems",
        "Face Recognition",
        "Real-time Processing",
        "Performance Analytics",
        "Document Understanding",
        "Context-Aware AI",
        "Question Answering Systems"
      ],
    },
    {
      category: "Data Science & Analytics",
      items: [
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "Data Mining",
        "Statistical Analysis",
        "Feature Engineering",
        "Data Visualization",
        "Power BI",
        "Matplotlib",
        "Seaborn",
        "Jupyter Notebooks",
        "SciPy",
        "Regression Analysis",
        "Classification Models",
        "Clustering Analysis"
      ],
    },
    {
      category: "Cloud & Infrastructure",
      items: [
        "Microsoft Azure",
        "Git",
        "GitHub",
        "Visual Studio Code",
        "Microservices Architecture",
        "JWT Authentication",
        "RESTful APIs"
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
        "Power BI",
        "Tailwind CSS"
      ],
    },
    {
      category: "Web & Database Frameworks",
      items: [
        "Next.js",
        "React",
        "FastAPI",
        "SQLAlchemy",
        "PostgreSQL",
        "Django 4.2",
        "SQLite",
        "WebSocket",
        "RESTful APIs",
        "Django Channels"
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
        "Awarded 4th Top-Ranked Student among other students. Distinctive Cumulative GPA 3.51 out of scale 4 – Equivalent Grade Excellent.",
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
      title: "Data Analysis & Machine Learning Platform",
      description: "Comprehensive data analysis and machine learning platform that transforms raw data into valuable insights. Built custom predictive models, statistical analysis tools, and interactive dashboards for various business domains including sales forecasting, customer behavior analysis, and survey data processing. Features automated data cleaning, visualization, and model deployment capabilities.",
      technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "Matplotlib", "Seaborn", "FastAPI", "Jupyter", "SQL", "Excel"],
      link: "https://mostaql.com/portfolio/2989421",
    },
    {
      title: "Luxury Fashion E-commerce Store",
      description: "Premium e-commerce platform for luxury fashion brands built with WordPress and WooCommerce. Features sophisticated product filtering, responsive design optimized for mobile devices, secure checkout system, and performance optimization. Includes advanced SEO implementation, custom CSS styling, and seamless user experience design tailored for high-end fashion retail.",
      technologies: ["WordPress", "WooCommerce", "Elementor", "CSS", "JavaScript", "SEO", "Performance Optimization", "SSL Security"],
      link: "https://mostaql.com/portfolio/2989410",
    },
    {
      title: "Multilingual Tourism Booking Platform",
      description: "Full-stack tourism booking platform supporting multiple languages for educational tours in conflict-affected regions. Built with modern tech stack featuring FastAPI backend, Supabase database, and TypeScript frontend. Includes comprehensive admin dashboard, user management system, dynamic tour management, and secure booking functionality with REST API integration.",
      technologies: ["FastAPI", "Supabase", "PostgreSQL", "TypeScript", "REST API", "Admin Dashboard", "Authentication", "Multilingual Support"],
      link: "https://mostaql.com/portfolio/2989406",
    },
    {
      title: "Medical Landing Page for Pediatrician",
      description: "Professional responsive landing page designed specifically for pediatric healthcare providers. Features bilingual support (Arabic/English), medical-focused design elements, appointment booking integration, and mobile-optimized responsive layout. Emphasizes user trust, accessibility, and professional medical aesthetics to enhance patient engagement and online presence.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Bilingual Support", "Medical UI/UX", "Performance Optimization"],
      link: "https://mostaql.com/portfolio/2989396",
    },
    {
      title: "Personal Portfolio Website with Animations",
      description: "Modern personal portfolio website built with React and TypeScript featuring smooth animations and interactive elements. Showcases professional work, skills, and achievements with dynamic content loading, responsive design, and engaging user interface. Implements advanced CSS animations, component-based architecture, and optimized performance for superior user experience.",
      technologies: ["React", "TypeScript", "Framer Motion", "CSS Animations", "Responsive Design", "Component Architecture", "Performance Optimization"],
      link: "https://mostaql.com/portfolio/2989387",
    },
    {
      title: "Bilingual Business Website",
      description: "Contemporary business website with dual-language support (Arabic/English) featuring modern design principles and high-performance optimization. Built with clean architecture, responsive layout, and fast loading times. Includes business-focused sections, contact forms, service presentations, and SEO optimization for enhanced online visibility and customer engagement.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Bilingual Support", "SEO", "Responsive Design", "Performance Optimization", "Business UI/UX"],
      link: "https://mostaql.com/portfolio/2989372",
    },
    {
      title: "Modern Portfolio Website with Next.js",
      description: "High-performance portfolio website built with Next.js framework featuring server-side rendering, optimized loading, and modern web technologies. Includes dynamic content management, responsive design, smooth navigation, and professional presentation of work and achievements. Emphasizes fast loading times and excellent user experience across all devices.",
      technologies: ["Next.js", "React", "Server-Side Rendering", "Performance Optimization", "Responsive Design", "Modern Web Stack"],
      link: "https://mostaql.com/portfolio/2989336",
    },
    {
      title: "Professional Responsive Portfolio",
      description: "Comprehensive professional portfolio website built with Next.js showcasing advanced web development capabilities. Features responsive design, fast loading times, interactive elements, and professional presentation of projects and skills. Implements modern web standards, accessibility best practices, and cross-browser compatibility for optimal user experience.",
      technologies: ["Next.js", "React", "CSS3", "Responsive Design", "Web Standards", "Accessibility", "Cross-browser Compatibility"],
      link: "https://mostaql.com/portfolio/2989330",
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
