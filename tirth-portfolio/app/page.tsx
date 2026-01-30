'use client';

import { useState, useEffect } from 'react';
import {
  SiJavascript, SiPython, SiOpenjdk, SiDart, SiMysql,
  SiFlutter, SiAndroid, SiSpring, SiSpringboot, SiFirebase, SiMongodb,
  SiGit, SiGithub, SiLinkedin, SiGmail
} from 'react-icons/si';
import { HiCode, HiDatabase, HiCog, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { personalInfo, skills, experience, education, projects, socialLinks } from '@/data/portfolio';

// Icon mapping for tech stack
const techIcons: Record<string, any> = {
  // Languages
  'Java': SiOpenjdk,
  'Python': SiPython,
  'JavaScript': SiJavascript,
  'Dart': SiDart,
  'SQL': SiMysql,

  // Frameworks
  'Flutter': SiFlutter,
  'Android SDK': SiAndroid,
  'Spring Core': SiSpring,
  'Spring Boot': SiSpringboot,

  // Database
  'Firebase': SiFirebase,
  'Firestore': SiFirebase,
  'MongoDB': SiMongodb,
  'MySQL': SiMysql,

  // Tools
  'Git': SiGit,
  'GitHub': SiGithub,
};

// Text Decoding Component
const DecodedText = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      if (iteration < delay) {
        iteration += 1;
        return;
      }

      setDisplayText(text
        .split("")
        .map((char, index) => {
          if (index < iteration - delay) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("")
      );

      if (iteration - delay >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2; // Speed of decoding
    }, 30);

    return () => clearInterval(interval);
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 300);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-full max-w-2xl px-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <DecodedText text="SYSTEM INITIALIZATION" className="text-cyan-400 font-mono text-sm" />
              <span className="text-cyan-400 font-mono text-sm">{loadingProgress}%</span>
            </div>
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
          <div className="space-y-1 font-mono text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              <DecodedText text="Loading neural network..." delay={5} />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              <DecodedText text="Initializing interface modules..." delay={15} />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              <DecodedText text="Establishing connection..." delay={25} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200">
      {/* Grid Background */}
      <div className="cyber-bg" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-2 border-cyan-500 flex items-center justify-center">
                <span className="text-cyan-400 font-bold font-['Orbitron'] text-sm">TB</span>
              </div>
              <div>
                <div className="text-sm font-['Orbitron'] font-bold text-white tracking-wider">
                  <DecodedText text={personalInfo.name.toUpperCase()} />
                </div>
                <div className="text-xs text-gray-500 font-mono">DEVELOPER INTERFACE v1.0</div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {['HOME', 'SKILLS', 'PROJECTS', 'CONTACT'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-['Orbitron'] font-semibold tracking-wider transition-all relative ${activeSection === item.toLowerCase()
                    ? 'text-cyan-400'
                    : 'text-gray-400 hover:text-cyan-400'
                    }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-500" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-500 font-mono">ONLINE</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-cyan-400 font-mono text-sm tracking-wider">
                  <DecodedText text="DEVELOPER_PROFILE" />
                </div>
                <h1 className="glitch-title leading-tight mb-4" data-text={personalInfo.name}>
                  {personalInfo.name}
                </h1>
                <div className="text-xl text-gray-400 font-['Rajdhani'] font-medium">
                  <DecodedText text={personalInfo.title} delay={20} />
                </div>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                {personalInfo.bio}
              </p>

              <div className="flex gap-4">
                <button className="cyber-btn group" onClick={() => scrollToSection('contact')}>
                  <span className="relative z-10 flex items-center gap-2">
                    <HiMail className="w-5 h-5" />
                    CONTACT
                  </span>
                </button>
                <a href={personalInfo.resumeUrl} download className="cyber-btn border-pink-500 group">
                  <span className="relative z-10 flex items-center gap-2">
                    <HiCode className="w-5 h-5" />
                    RESUME
                  </span>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 border border-cyan-500/50 flex items-center justify-center hover:bg-cyan-500/10 hover:border-cyan-500 transition-all group">
                  <SiGithub className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 border border-blue-500/50 flex items-center justify-center hover:bg-blue-500/10 hover:border-blue-500 transition-all group">
                  <SiLinkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </a>
                <a href={socialLinks.email}
                  className="w-12 h-12 border border-pink-500/50 flex items-center justify-center hover:bg-pink-500/10 hover:border-pink-500 transition-all group">
                  <SiGmail className="w-5 h-5 text-gray-400 group-hover:text-pink-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* Right - Stats Panel */}
            {/* <div className="hud-border p-8 space-y-6">
              <div className="text-cyan-400 font-mono text-sm mb-4">SYSTEM_STATUS</div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white font-['Orbitron']">{experience.length}</div>
                  <div className="text-xs text-gray-500 font-mono">MISSIONS_COMPLETED</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white font-['Orbitron']">{projects.length}</div>
                  <div className="text-xs text-gray-500 font-mono">PROJECTS_DEPLOYED</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white font-['Orbitron']">
                    {skills.languages.length + skills.frameworks.length}
                  </div>
                  <div className="text-xs text-gray-500 font-mono">TECH_STACK</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white font-['Orbitron']">{education.length}</div>
                  <div className="text-xs text-gray-500 font-mono">CERTIFICATIONS</div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-800">
                <div className="text-xs text-gray-500 font-mono mb-2">CURRENT_LOCATION</div>
                <div className="text-sm text-gray-300">{personalInfo.location}</div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Skills Section - Icon Grid */}
      <section id="skills" className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-950/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="text-cyan-400 font-mono text-sm mb-2">TECH_STACK</div>
            <h2 className="text-4xl font-bold font-['Orbitron'] text-white">ABILITIES</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Languages */}
            <div className="hud-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <HiCode className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="text-lg font-['Orbitron'] font-bold text-white">LANGUAGES</h3>
                  <div className="text-xs text-gray-500 font-mono">CORE_SYSTEMS</div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {skills.languages.map((skill) => {
                  const Icon = techIcons[skill];
                  return Icon ? (
                    <div
                      key={skill}
                      className="relative group"
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="w-12 h-12 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/10 hover:border-cyan-500 transition-all cursor-pointer">
                        <Icon className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      {hoveredSkill === skill && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-cyan-500 px-2 py-1 text-xs text-cyan-400 font-mono whitespace-nowrap z-10">
                          {skill}
                        </div>
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Frameworks */}
            <div className="hud-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <HiCog className="w-6 h-6 text-pink-400" />
                <div>
                  <h3 className="text-lg font-['Orbitron'] font-bold text-white">FRAMEWORKS</h3>
                  <div className="text-xs text-gray-500 font-mono">MODULES</div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {skills.frameworks.map((skill) => {
                  const Icon = techIcons[skill];
                  return Icon ? (
                    <div
                      key={skill}
                      className="relative group"
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="w-12 h-12 border border-pink-500/30 flex items-center justify-center hover:bg-pink-500/10 hover:border-pink-500 transition-all cursor-pointer">
                        <Icon className="w-6 h-6 text-gray-400 group-hover:text-pink-400 transition-colors" />
                      </div>
                      {hoveredSkill === skill && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-pink-500 px-2 py-1 text-xs text-pink-400 font-mono whitespace-nowrap z-10">
                          {skill}
                        </div>
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Database & Tools */}
            <div className="hud-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <HiDatabase className="w-6 h-6 text-purple-400" />
                <div>
                  <h3 className="text-lg font-['Orbitron'] font-bold text-white">DATABASE</h3>
                  <div className="text-xs text-gray-500 font-mono">STORAGE</div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {skills.database.slice(0, 5).map((skill) => {
                  const Icon = techIcons[skill];
                  return Icon ? (
                    <div
                      key={skill}
                      className="relative group"
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="w-12 h-12 border border-purple-500/30 flex items-center justify-center hover:bg-purple-500/10 hover:border-purple-500 transition-all cursor-pointer">
                        <Icon className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      </div>
                      {hoveredSkill === skill && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-purple-500 px-2 py-1 text-xs text-purple-400 font-mono whitespace-nowrap z-10">
                          {skill}
                        </div>
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="text-cyan-400 font-mono text-sm mb-2">PROJECT_ARCHIVE</div>
            <h2 className="text-4xl font-bold font-['Orbitron'] text-white">DEPLOYMENTS</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="mission-card group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-['Orbitron'] font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <div className="px-2 py-1 bg-yellow-500/20 border border-yellow-500 text-yellow-500 text-xs font-mono">
                      FEATURED
                    </div>
                  )}
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                {/* Tech Stack Icons */}
                <div className="flex gap-2 mb-4">
                  {project.technologies.slice(0, 6).map((tech) => {
                    const Icon = techIcons[tech];
                    return Icon ? (
                      <div key={tech} className="w-8 h-8 border border-gray-700 flex items-center justify-center group-hover:border-cyan-500/50 transition-all">
                        <Icon className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                      </div>
                    ) : null;
                  })}
                </div>

                <div className="text-xs text-cyan-400 font-mono">CLICK_TO_EXPAND →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-transparent to-cyan-950/10">
        <div className="max-w-4xl mx-auto">
          <div className="hud-border p-8">
            <div className="mb-8">
              <div className="text-cyan-400 font-mono text-sm mb-2">COMMUNICATION_LINK</div>
              <h2 className="text-3xl font-bold font-['Orbitron'] text-white">ESTABLISH CONNECTION</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <a href={`mailto:${personalInfo.email}`} className="hud-border p-6 hover:bg-cyan-500/5 transition-all group">
                <HiMail className="w-8 h-8 text-cyan-400 mb-3" />
                <div className="text-xs text-gray-500 font-mono mb-1">EMAIL</div>
                <div className="text-sm text-gray-300 group-hover:text-cyan-400 transition-colors break-all">
                  {personalInfo.email}
                </div>
              </a>

              <a href={`tel:${personalInfo.phone}`} className="hud-border p-6 hover:bg-pink-500/5 transition-all group">
                <HiPhone className="w-8 h-8 text-pink-400 mb-3" />
                <div className="text-xs text-gray-500 font-mono mb-1">PHONE</div>
                <div className="text-sm text-gray-300 group-hover:text-pink-400 transition-colors">
                  {personalInfo.phone}
                </div>
              </a>

              <div className="hud-border p-6">
                <HiLocationMarker className="w-8 h-8 text-purple-400 mb-3" />
                <div className="text-xs text-gray-500 font-mono mb-1">LOCATION</div>
                <div className="text-sm text-gray-300">{personalInfo.location}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-cyan-500/20 bg-black/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xs text-gray-500 font-mono">
            © 2026 {personalInfo.name} | v1.0.0
          </div>
          <div className="text-xs text-gray-500 font-mono">
            DESIGNED_WITH_PRECISION
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedProject(null)}>
          <div className="max-w-3xl w-full hud-border p-8 bg-[#0a0a0f]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-3xl font-['Orbitron'] font-bold text-white mb-2">{selectedProject.title}</h3>
                <div className="text-cyan-400 font-mono text-sm">PROJECT_DETAILS</div>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-white text-2xl">×</button>
            </div>

            <p className="text-gray-300 mb-6">{selectedProject.description}</p>

            <div className="mb-6">
              <div className="text-sm text-gray-500 font-mono mb-3">OBJECTIVES:</div>
              <ul className="space-y-2">
                {selectedProject.highlights.map((highlight: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-500 font-mono mb-3">TECH_STACK:</div>
              <div className="flex flex-wrap gap-3">
                {selectedProject.technologies.map((tech: string) => {
                  const Icon = techIcons[tech];
                  return Icon ? (
                    <div key={tech} className="flex items-center gap-2 px-3 py-2 border border-cyan-500/30 bg-cyan-500/5">
                      <Icon className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm text-gray-300">{tech}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="cyber-btn inline-block">
              <span className="relative z-10 flex items-center gap-2">
                <SiGithub className="w-5 h-5" />
                VIEW_SOURCE
              </span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
