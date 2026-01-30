'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  SiJavascript, SiPython, SiOpenjdk, SiDart, SiMysql,
  SiFlutter, SiAndroid, SiSpring, SiSpringboot, SiFirebase, SiMongodb,
  SiGit, SiGithub, SiLinkedin, SiGmail, SiPostgresql, SiOpenai
} from 'react-icons/si';
import { HiCode, HiDatabase, HiCog, HiMail, HiPhone, HiLocationMarker, HiAcademicCap, HiLightningBolt, HiServer, HiCube, HiSun, HiMoon, HiBriefcase } from 'react-icons/hi';
import { GiStagHead, GiRevolver, GiNotebook, GiPoliceBadge } from 'react-icons/gi';
import { personalInfo, skills, experience, education, projects, socialLinks } from '@/data/portfolio';

// Icon mapping for tech stack
const techIcons: Record<string, any> = {
  'Java': SiOpenjdk,
  'Python': SiPython,
  'JavaScript': SiJavascript,
  'Dart': SiDart,
  'SQL': SiMysql,
  'Flutter': SiFlutter,
  'Android SDK': SiAndroid,
  'Spring Core': SiSpring,
  'Spring Boot': SiSpringboot,
  'GetX': HiLightningBolt,
  'Bloc/Cubit': HiCube,
  'Firebase': SiFirebase,
  'Firestore': SiFirebase,
  'MongoDB': SiMongodb,
  'MySQL': SiMysql,
  'PostgreSQL': SiPostgresql,
  'REST API': HiServer,
  'Git': SiGit,
  'GitHub': SiGithub,
  'RAG (LLMs)': SiOpenai,
  'LangChain': HiCode,
};

// Typewriter Component
const TypewriterText = ({ text, className = "", delay = 50 }: { text: string, className?: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayText("");
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<any>(null);


  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'education', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

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
          setTimeout(() => setIsLoaded(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
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
      <div className="min-h-screen flex items-center justify-center bg-[#e3dac9] relative overflow-hidden text-[#1a1a1a]">
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')" }}></div>
        <div className="w-full max-w-[90%] md:max-w-md px-4 md:px-8 relative z-10 text-center h-[200px] flex flex-col items-center justify-center">
          <div className="flex justify-center mb-6 text-[#8a0303]">
            <GiRevolver className="w-16 h-16 animate-pulse" />
          </div>
          <h2 className="text-3xl font-[Rye] text-[#8a0303] mb-4 tracking-widest">LOADING PROVISIONS</h2>
          <div className="h-4 border-2 border-[#1a1a1a] p-0.5 rounded-sm w-full">
            <div
              className="h-full bg-[#1a1a1a] transition-all duration-100"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="mt-2 text-[#4a3728] font-[Courier Prime] text-sm h-6">
            <span className="font-[Courier Prime] text-sm tracking-widest">{loadingProgress}% COMPLETE</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-20 transition-colors duration-500`}>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#e3dac9]/95 backdrop-blur-sm border-b-2 border-current shadow-md py-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-[var(--rdr-black)]">
          <div className="flex items-center gap-3">
            <div className="bg-[var(--rdr-red)] text-white p-1 rounded-full">
              <GiStagHead className="w-6 h-6" />
            </div>
            <span className="font-[Rye] text-2xl">TB</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['HOME', 'SKILLS', 'ACADEMIC', 'PROJECTS', 'WORK', 'CONTACT'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === 'ACADEMIC') scrollToSection('education');
                  else if (item === 'WORK') scrollToSection('experience');
                  else scrollToSection(item.toLowerCase());
                }}
                className={`text-sm font-[Rye] tracking-widest transition-all relative group ${(item === 'ACADEMIC' && activeSection === 'education') ||
                  (item === 'WORK' && activeSection === 'experience') ||
                  activeSection === item.toLowerCase()
                  ? 'text-[var(--rdr-red)]'
                  : 'hover:text-[var(--rdr-red)]'
                  }`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[var(--rdr-red)] transition-all duration-300 ${(item === 'ACADEMIC' && activeSection === 'education') ||
                  (item === 'WORK' && activeSection === 'experience') ||
                  activeSection === item.toLowerCase()
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
                  }`}></span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-24 px-6 max-w-6xl mx-auto space-y-32">

        {/* HERO SECTION - WANTED POSTER STYLE */}
        <section id="home" className="min-h-[85vh] flex flex-col items-center justify-center">
          <div className="wanted-poster max-w-4xl w-full transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="wanted-corner top-2 left-2"></div>
            <div className="wanted-corner top-2 right-2"></div>
            <div className="wanted-corner bottom-2 left-2"></div>
            <div className="wanted-corner bottom-2 right-2"></div>

            <div className="pt-8 pb-4 text-center border-b-2 border-current mb-8 mx-8">
              <h1 className="text-6xl md:text-8xl font-[Rye] mb-2 text-[var(--rdr-red)]">WANTED</h1>
              <div className="font-[Courier Prime] text-xl tracking-widest uppercase opacity-80">
                <TypewriterText text="Exceptional Engineer" delay={50} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 px-8 pb-12">
              <div className="border-4 border-current p-2 shadow-inner relative min-h-[300px] flex items-center justify-center overflow-hidden sepia">
                {/* Profile Image with Optimization */}
                {personalInfo.profileImage ? (
                  <Image
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#3a3a3a] flex items-center justify-center">
                    <span className="text-9xl font-[Rye] opacity-20">TB</span>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 z-10"></div>

                <div className="absolute top-8 -right-2 z-20 text-center font-[Rye] text-lg md:text-xl text-[var(--rdr-red)] rotate-12 border-4 border-double border-[var(--rdr-red)] px-3 py-1 high-honor-glow opacity-90 shadow-sm bg-[#e3dac9]/10 backdrop-blur-[1px]">OPEN TO WORK</div>
              </div>

              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <h2 className="text-4xl font-[Rye] mb-1">{personalInfo.name.toUpperCase()}</h2>
                  <p className="font-[Courier Prime] text-[var(--rdr-red)] text-lg font-bold">{personalInfo.title}</p>
                </div>

                <p className="font-[Crimson Text] text-xl leading-relaxed italic opacity-90">
                  "{personalInfo.bio}"
                </p>

                {/* the badge component */}
                <div className="flex flex-col items-center justify-center border-t border-current pt-6 mt-4 opacity-100">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                      {/* <GiPoliceBadge className="w-16 h-16 text-[var(--rdr-gold)] drop-shadow-md" /> */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* <span className="text-[8px] font-bold mt-1 text-[#4a3728]">HIGH</span> */}
                      </div>
                    </div>
                    {/* <span className="font-[Rye] text-sm tracking-widest text-[var(--rdr-red)]">HIGH HONOR</span> */}
                  </div>
                  {/* <div className="mt-2 text-xs font-[Courier Prime] opacity-60">Verified Developer</div> */}
                </div>

              </div>
            </div>

            <div className="text-center pb-6">
              <div className="flex justify-center gap-2 mb-4">
                <span className="text-2xl text-[var(--rdr-red)]">★</span>
                <span className="text-2xl text-[var(--rdr-red)]">★</span>
                <span className="text-2xl text-[var(--rdr-red)]">★</span>
              </div>
              <p className="font-[Courier Prime] italic text-xs mb-4">"I have a plan... to write great code."</p>
              <div className="flex flex-col md:flex-row justify-center gap-4 px-4 md:px-0">
                <button onClick={() => scrollToSection('contact')} className="western-btn w-full md:w-auto">
                  Send Telegram
                </button>
                <a href={personalInfo.resumeUrl} download className="western-btn-outline w-full md:w-auto text-center block">
                  Resume
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* SKILLS SECTION - CIGARETTE CARDS */}
        <section id="skills" className="relative">
          <div className="section-divider"></div>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-[Rye] mb-4">COLLECTOR'S CARDS</h2>
            <p className="font-[Courier Prime] opacity-80">Fine Equipment & Rare Abilities</p>
          </div>

          <div className="space-y-12">
            {/* Languages Row */}
            <div>
              <h3 className="text-2xl font-[Rye] mb-6 border-b border-current inline-block pb-2">Languages</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {skills.languages.map((skill) => {
                  const Icon = techIcons[skill];
                  return (
                    <div key={skill} className="relative pl-6 py-2">
                      <div className="bg-[#e3dac9] bg-paper-texture p-4 border border-current shadow-md relative group hover:-translate-y-1 transition-transform h-full flex flex-col items-center justify-center text-center">
                        {/* Corner Accents */}
                        <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-current opacity-50"></div>
                        <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-current opacity-50"></div>
                        <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-current opacity-50"></div>
                        <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-current opacity-50"></div>

                        <div className="mb-3 text-[var(--rdr-red)]">
                          {Icon ? <Icon className="w-12 h-12" /> : <GiNotebook className="w-12 h-12" />}
                        </div>
                        <div className="font-[Rye] text-base font-bold text-[#1a1a1a]">{skill}</div>
                        {/* <div className="text-[10px] uppercase font-[Courier Prime] mt-1 opacity-60 text-[#1a1a1a]">Rank 10</div> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Frameworks Row - Ability Cards */}
            <div>
              <h3 className="text-2xl font-[Rye] mb-6 border-b border-current inline-block pb-2">Abilities (Frameworks)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {skills.frameworks.map((skill) => {
                  const Icon = techIcons[skill];
                  return (
                    <div key={skill} className="relative pl-6 py-2">
                      <div className="bg-[#e3dac9] bg-paper-texture p-4 border border-current shadow-md relative group hover:-translate-y-1 transition-transform h-full flex flex-col items-center justify-center text-center">
                        {/* Corner Accents */}
                        <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-current opacity-50"></div>
                        <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-current opacity-50"></div>
                        <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-current opacity-50"></div>
                        <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-current opacity-50"></div>

                        <div className="mb-3 text-[var(--rdr-red)]">
                          {Icon ? <Icon className="w-12 h-12" /> : <GiPoliceBadge className="w-12 h-12" />}
                        </div>
                        <div className="font-[Rye] text-base font-bold">{skill}</div>
                        {/* <div className="text-[10px] uppercase font-[Courier Prime] mt-1 opacity-60">Signature Ability</div> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tools Row */}
            <div>
              <h3 className="text-2xl font-[Rye] mb-6 border-b border-current inline-block pb-2">Satchel Items (Tools)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...skills.database, ...skills.tools].map((skill) => {
                  const Icon = techIcons[skill];
                  return (
                    <div key={skill} className="flex items-center gap-3 p-4 border border-current bg-[#e3dac9] bg-paper-texture shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-[var(--rdr-red)]">
                        {Icon ? <Icon className="w-6 h-6" /> : <GiRevolver className="w-6 h-6" />}
                      </div>
                      <span className="font-[Courier Prime] font-bold text-sm">{skill}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ACADEMIC SECTION */}
        <section id="education" className="relative">
          <div className="section-divider"></div>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-[Rye] mb-4">ACADEMIC RECORDS</h2>
            <p className="font-[Courier Prime] opacity-80">Certified & Verified</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {education.map((edu) => (
              <div key={edu.id} className="relative pl-8 border-l-4 border-[var(--rdr-red)] py-2">
                <div className="absolute -left-[11px] top-0 w-5 h-5 bg-[var(--rdr-red)] rounded-full border-4 border-[var(--bg-paper)]"></div>

                <div className="bg-[var(--bg-paper)] p-6 border border-current shadow-md relative group hover:-translate-y-1 transition-transform">
                  {/* Paper Clip Visual */}
                  <div className="absolute -top-3 right-8 w-4 h-8 border-2 border-current border-b-0 rounded-t-full bg-gray-400 opacity-50"></div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <h3 className="text-xl font-[Rye]">{edu.institution}</h3>
                    <span className="font-[Courier Prime] text-xs bg-[var(--rdr-black)] text-[var(--rdr-paper)] px-2 py-1 rounded">
                      {edu.duration}
                    </span>
                  </div>

                  <div className="font-[Courier Prime] font-bold text-[var(--rdr-red)] mb-2 text-sm">{edu.degree}</div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-current/20">
                    <div className="flex items-center gap-2 opacity-80 text-sm font-[Courier Prime]">
                      <HiLocationMarker /> {edu.location}
                    </div>
                    <div className="font-[Rye] text-sm">
                      Status: <span className="text-[var(--rdr-red)]">{edu.grade}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* PROJECTS SECTION - CASE FILES */}
        <section id="projects">
          <div className="section-divider"></div>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-[Rye] mb-4">CASE FILES</h2>
            <p className="font-[Courier Prime] opacity-80">Past Bounties Collected</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-[var(--bg-paper)] p-1 shadow-xl hover:-translate-y-1 transition-transform duration-300 transform rotate-1 hover:rotate-0"
              >
                <div className="border border-current p-6 h-full flex flex-col relative overflow-hidden">
                  {/* Stamp overlay */}
                  <div className="absolute -right-4 -top-4 w-24 h-24 border-4 border-[var(--rdr-red)] rounded-full flex items-center justify-center opacity-20 transform rotate-12 group-hover:opacity-100 transition-opacity">
                    <span className="font-[Rye] text-[var(--rdr-red)] text-xs transform -rotate-12">SOLVED</span>
                  </div>

                  <h3 className="text-2xl font-[Rye] mb-2 border-b border-current inline-block self-start pb-1">{project.title}</h3>
                  <p className="font-[Crimson Text] text-lg mb-4 flex-grow line-clamp-3 opacity-90">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.slice(0, 4).map(tech => (
                      <span key={tech} className="bg-[var(--rdr-black)] text-[var(--rdr-paper)] px-2 py-0.5 text-xs font-[Courier Prime] uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 text-right">
                    <span className="font-[Rye] text-[var(--rdr-red)] underline decoration-wavy group-hover:no-underline">Inspect File &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>



        {/* EXPERIENCE SECTION */}
        <section id="experience" className="relative">
          <div className="section-divider"></div>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-[Rye] mb-4">WORK HISTORY</h2>
            <p className="font-[Courier Prime] opacity-80">Proven Track Record</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {experience.map((job) => (
              <div key={job.id} className="relative pl-8 border-l-4 border-[var(--rdr-red)] py-2">
                <div className="absolute -left-[11px] top-0 w-5 h-5 bg-[var(--rdr-red)] rounded-full border-4 border-[var(--bg-paper)]"></div>

                <div className="bg-[#e3dac9] bg-paper-texture p-8 border border-current shadow-md relative group hover:-translate-y-1 transition-transform">
                  {/* Badge/Seal */}
                  <div className="absolute -top-4 -right-4 bg-[var(--rdr-red)] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transform rotate-12">
                    <HiBriefcase className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-current pb-4">
                    <div>
                      <h3 className="text-2xl font-[Rye]">{job.company}</h3>
                      <div className="font-[Courier Prime] text-[var(--rdr-red)] font-bold mb-1">{job.position}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-[Courier Prime] text-xs bg-[var(--rdr-black)] text-[#e3dac9] px-2 py-1 rounded block mb-1">
                        {job.duration}
                      </span>
                      <span className="text-xs font-[Courier Prime] opacity-70">{job.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-6 opacity-80 text-sm font-[Courier Prime]">
                    <HiLocationMarker /> {job.location}
                  </div>

                  <ul className="list-disc pl-5 space-y-2 font-[Crimson Text] text-lg mb-6 leading-relaxed">
                    {job.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-current/20">
                    {job.technologies.map((tech) => (
                      <span key={tech} className="text-xs font-[Courier Prime] border border-current px-2 py-1 rounded-sm opacity-70">
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION - TELEGRAM */}
        <section id="contact" className="pb-20">
          <div className="section-divider"></div>
          <div className="max-w-2xl mx-auto bg-[var(--bg-paper)] border-4 border-double border-current p-8 md:p-12 shadow-2xl transform -rotate-1">
            <div className="text-center mb-8 border-b border-current pb-4">
              <h2 className="text-4xl font-[Rye]">TELEGRAM OFFICE</h2>
              <p className="font-[Courier Prime] mt-2">Send a wire to {personalInfo.name}</p>
            </div>

            <div className="space-y-6">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-4 p-4 border border-current hover:bg-[var(--rdr-black)] hover:text-[var(--rdr-paper)] transition-colors group">
                <div className="w-12 h-12 flex items-center justify-center border-r border-current group-hover:border-[var(--rdr-paper)]">
                  <HiMail className="w-6 h-6" />
                </div>
                <div className="font-[Courier Prime]">
                  <div className="text-xs opacity-60 uppercase">Address To</div>
                  <div className="text-lg font-bold break-all">{personalInfo.email}</div>
                </div>
              </a>

              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-4 p-4 border border-current hover:bg-[var(--rdr-black)] hover:text-[var(--rdr-paper)] transition-colors group">
                <div className="w-12 h-12 flex items-center justify-center border-r border-current group-hover:border-[var(--rdr-paper)]">
                  <HiPhone className="w-6 h-6" />
                </div>
                <div className="font-[Courier Prime]">
                  <div className="text-xs opacity-60 uppercase">Wire To</div>
                  <div className="text-lg font-bold">{personalInfo.phone}</div>
                </div>
              </a>

              <div className="flex justify-center gap-6 pt-4">
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#0077b5] transition-colors">
                  <SiLinkedin className="w-8 h-8" />
                </a>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition-colors">
                  <SiGithub className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* <footer className="bg-[#1a1a1a] text-[#e3dac9] py-8 text-center font-[Courier Prime] text-sm mt-12 border-t-8 border-[var(--rdr-red)]">
        <p>&copy; 2026 {personalInfo.name}.</p>
      </footer> */}

      {/* MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div className="bg-[#f0e6d2] max-w-2xl w-full border-4 border-current p-1 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="border border-current p-6 relative">
              <button className="absolute top-2 right-4 text-3xl font-[Rye] hover:text-[var(--rdr-red)]" onClick={() => setSelectedProject(null)}>&times;</button>

              <h2 className="text-3xl font-[Rye] mb-1">{selectedProject.title}</h2>
              <div className="w-full h-1 bg-[var(--rdr-black)] mb-4"></div>

              <p className="font-[Crimson Text] text-lg mb-6">{selectedProject.description}</p>

              <div className="mb-6">
                <h4 className="font-[Rye] text-lg mb-2">Evidence & Highlights:</h4>
                <ul className="list-disc pl-6 space-y-1 font-[Courier Prime] text-sm">
                  {selectedProject.highlights.map((h: string, i: number) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.technologies.map((tech: string) => {
                  const Icon = techIcons[tech];
                  return (
                    <span key={tech} className="bg-[var(--rdr-red)] text-white px-2 py-1 text-xs font-[Courier Prime] uppercase flex items-center gap-2">
                      {Icon && <Icon className="w-3 h-3 text-white" />}
                      {tech}
                    </span>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="western-btn inline-block text-center flex-1">
                  View Source
                </a>
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="western-btn-outline inline-block text-center flex-1">
                    Launch
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
