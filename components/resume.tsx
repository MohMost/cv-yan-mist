"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import {
  Briefcase,
  User,
  Award,
  GraduationCap,
  Dot,
  Wrench,
  HandMetal,
  Phone,
  Mail,
  MapPin,
  Plus,
  Printer,
  Share,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { ModeToggle } from "./ThemeToggler";
import Image from "next/image";
import { useTheme } from "next-themes";
import { FloatingDockDemo } from "./contacts";
import BoxReveal from "./ui/box-reveal";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

export interface Resume {
  personalInfo: PersonalInfo;
  profile: string;
  experience: Experience[];
  languages: string[];
  skills: Skills;
  education: Education[];
  certification: Certification[];
  intrest: Intrest[];
}
export interface PersonalInfo {
  name: string;
  firstname: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  photo: {
    asset: {
      url: string;
    };
  };
}

export interface Experience {
  jobTitle: string;
  location: string;
  dateRange: string;
  responsibilities: string[];
}

export interface Skills {
  softwareSkills: {
    name: string;
    logo: {
      asset: {
        url: string;
      };
    };
  }[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  dateRange: string;
  description: string;
}
export interface Certification {
  degree: string;
  institution: string;
  location: string;
  dateRange: string;
  description: string;
}
export interface Intrest {
  name: string;
}
export default function Resume() {
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const { theme } = useTheme();
  const [isClicked, setIsClicked] = useState(false);
  const themeUse = () => {
    if (theme === "dark") {
      return "Dark";
    } else {
      return "Light";
    }
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handlePrint = () => {
    window.print();
  };
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Consultez mon CV !",
          url: window.location.href,
        });
        console.log("Successfully shared");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy the URL to the clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papier !");
    }
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    client
      .fetch(
        `*[_type == "resume"]{
          personalInfo {
            name,
            firstname,
            title,
            email,
            phone,
            linkedin,
            location,
            photo {
              asset-> {
                url
              }
            }
          },
          profile,
          experience[] {
            jobTitle,
            location,
            dateRange,
            responsibilities
          },
          languages,
          skills {
            softwareSkills[] {
              name,
              logo {
                asset-> {
                  url
                }
              }
            }
          },
          education[] {
            degree,
            institution,
            location,
            dateRange,
            description
          },
          certification[] {
            degree,
            institution,
            location,
            dateRange,
            description
          },
          intrest[] {
            name,         
          }
        }`
      )
      .then((data) => {
        // Assigne toutes les données du premier document de type resume à l'état
        const resumeData = data[0];
        setResumeData(resumeData);
      })
      .catch(console.error);
  }, []);

  if (!resumeData)
    return (
      <div className="flex  justify-center items-center h-screen w-full">
        Chargement...
      </div>
    );

  return (
    <div className=" min-h-screen md:p-4 m-4 md:p-8 flex justify-center items-start text-foreground">
      {" "}
      <BoxReveal>
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 z-50  ">
          {/* Left Column - Sticky */}
          <div className="md:w-1/3   md:sticky md:top-8  md:overflow-auto">
            <div className="p-6 flex items-center gap-4">
              <ModeToggle /> {themeUse()}
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center">
                {resumeData && (
                  <h1 className="text-7xl mb-2 font-bold">
                    {resumeData.personalInfo.name}{" "}
                    {resumeData.personalInfo.firstname}
                  </h1>
                )}
                <p className="text-2xl mt-2 mb-2">
                  {resumeData.personalInfo.title}
                </p>
                <Image
                  src={`${resumeData.personalInfo.photo.asset.url}`}
                  alt="profile"
                  className={`w-52 h-52 mx-auto mb-4 object-cover transition-all hover:scale-105 hover:grayscale-0 duration-300 ${
                    isClicked ? "scale-105 grayscale-0" : "grayscale"
                  }`}
                  width={200}
                  height={200}
                  onClick={handleClick}
                />
              </div>
              <div>
                <div className="space-y-4">
                  <p>{resumeData.profile}</p>
                </div>
              </div>
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold flex items-center border-y-2 border-black dark:border-white ">
                  <User className="mr-2" /> Contact
                </h2>
                <FloatingDockDemo />
              </div>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="education">
                <AccordionTrigger className="flex text-nowrap text-left  font-semibold text-2xl p-4 border-y-2 border-black dark:border-white hover:text-primary hover:text-3xl ">
                  <div className="flex items-center w-2/3 ">
                    <Plus className="mr-2 " />
                    <h3>Afficher plus</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-4">
                  {" "}
                  <ul className="flex gap-2 flex-col p-2 ">
                    <li className="flex items-center group">
                      <Mail
                        className="mr-2 group-hover:text-secondary transition-colors duration-300"
                        size={18}
                      />
                      <a
                        href={`mailto:${resumeData.personalInfo.email}`}
                        className="hover:underline"
                      >
                        {resumeData.personalInfo.email}
                      </a>
                    </li>
                    <li className="flex items-center group">
                      <Phone
                        className="mr-2 group-hover:text-secondary transition-colors duration-300"
                        size={18}
                      />
                      <a
                        href={`tel:${resumeData.personalInfo.phone}`}
                        className="hover:underline"
                      >
                        {resumeData.personalInfo.phone}
                      </a>
                    </li>
                    <li className="flex items-center group">
                      <LinkedInLogoIcon className="mr-2 group-hover:text-secondary transition-colors duration-300" />
                      <a
                        href={`${resumeData.personalInfo.linkedin}`}
                        className="hover:underline"
                      >
                        {resumeData.personalInfo.linkedin}
                      </a>
                    </li>
                    <li className="flex items-center group">
                      <MapPin
                        className="mr-2 group-hover:text-secondary transition-colors duration-300"
                        size={18}
                      />
                      <a
                        href={`https://www.google.com/search?client=opera-gx&q=10+rue+Henri+Poincar%C3%A9+-13388+Marseille&sourceid=opera&ie=UTF-8&oe=UTF-8`}
                        className="hover:underline"
                      >
                        10 rue Henri Poincaré -13388 Marseille
                      </a>
                    </li>
                  </ul>
                  <div className="flex mt-4 justify-center gap-4 items-center">
                    <Button className="flex gap-2" onClick={handlePrint}>
                      <Printer size={20} />
                      Imprimer
                    </Button>
                    <Button className="flex gap-2" onClick={handleShare}>
                      <Share size={20} />
                      Partager
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          {/* Right Column - Scrollable */}
          <div className="md:w-2/3 space-y-6 md:py-32 ">
            {/* Profil Section */}
            {/* Expériences Section */}
            <Accordion type="single" collapsible>
              <AccordionItem value="education">
                <AccordionTrigger className="flex text-nowrap text-left  font-semibold text-2xl p-4 border-y-2 border-black dark:border-white hover:text-primary hover:text-3xl ">
                  <div className="flex items-center w-2/3 ">
                    <Briefcase className="mr-2 " />
                    <h3>Experience</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-4">
                  {" "}
                  {resumeData.experience.map((job, index) => (
                    <div key={index} className="flex gap-2 ">
                      <div className="flex flex-col items-center   ">
                        <Dot />
                        <div className="w-px h-full bg-[#000000] dark:bg-white"></div>
                      </div>
                      <div className="pb-4">
                        <h3 className="text-lg font-semibold">
                          {job.jobTitle}
                        </h3>
                        <p className="text-muted-foreground">
                          {job.location} | {job.dateRange}
                        </p>
                        <ul className="list-disc list-inside mt-2">
                          {job.responsibilities.map((task, idx) => (
                            <li key={idx}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* Compétences Section */}
            <Accordion type="single" collapsible>
              <AccordionItem value="education">
                <AccordionTrigger className="flex text-nowrap text-left font-semibold text-2xl p-4 border-y-2 border-black dark:border-white hover:text-primary hover:text-3xl">
                  <div className="flex items-center w-2/3">
                    <GraduationCap className="mr-2 " />
                    <h3>Education</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="flex gap-2 ">
                      <div className="flex flex-col items-center   ">
                        <Dot />
                        <div className="w-px h-full bg-[#000000] dark:bg-white"></div>
                      </div>
                      <div className="pb-4">
                        <h3 className="text-lg font-semibold">
                          {edu.degree} | {edu.institution}
                        </h3>

                        <p className="text-muted-foreground">
                          {edu.location} | {edu.dateRange}
                        </p>
                        <p>{edu.description}</p>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="education">
                <AccordionTrigger className="flex text-nowrap text-left  font-semibold text-2xl p-4 border-y-2 border-black dark:border-white hover:text-primary hover:text-3xl">
                  <div className="flex items-center w-2/3">
                    <Award className="mr-2 " />
                    <h3 className="hidden md:block">Certifications</h3>
                    <h3 className="md:hidden">Diplômes</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-4">
                  {resumeData.certification.map((edu, index) => (
                    <div key={index} className="flex gap-2 ">
                      <div className="flex flex-col items-center   ">
                        <Dot />
                        <div className="w-px h-full bg-[#000000] dark:bg-white"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {edu.degree} | {edu.institution}
                        </h3>

                        <p className="text-muted-foreground">
                          {edu.location} | {edu.dateRange}
                        </p>
                        <p>{edu.description}</p>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex flex-col space-y-4">
              <h2 className="flex text-nowrap text-left items-center font-semibold text-2xl p-1 border-b-2 border-black dark:border-white ">
                Compétences
                <Wrench className="ml-2" />
              </h2>
              <div>
                <h3 className="text-lg font-semibold mb-2">Informatique</h3>
                <div className="flex gap-2 list-disc list-inside px-4">
                  {resumeData.skills.softwareSkills.map((skill, idx) => (
                    <div key={idx}>
                      <AnimatedTooltip
                        items={[
                          {
                            id: idx,
                            name: skill.name,

                            image: skill.logo.asset.url,
                          },
                        ]}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Langues</h3>
                <ul className="list-disc list-inside">
                  {resumeData.languages.map((language, idx) => (
                    <li key={idx}>{language}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <h2 className="flex text-nowrap text-left items-center font-semibold text-2xl p-1 border-b-2 border-black dark:border-white ">
                Centres d&apos;intérêt
                <HandMetal className="ml-2" />
              </h2>

              <div>
                <ul className="list-disc list-inside">
                  {resumeData.intrest.map((item, idx) => (
                    <li key={idx}>{item.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </BoxReveal>
    </div>
  );
}
