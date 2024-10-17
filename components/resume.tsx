"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Book,
  Briefcase,
  User,
  Award,
  GraduationCap,
  Dot,
  Wrench,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { ModeToggle } from "./ThemeToggler";
import Image from "next/image";

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
  softwareSkills: string[];
  languages: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  dateRange: string;
  description: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  profile: string;
  experience: Experience[];
  skills: Skills;
  education: Education[];
}

export default function Resume() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

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
          profile ,
          experience,
          skills,
          education
        }`
      )
      .then((data) => setResumeData(data[0]))
      .catch(console.error);
  }, []);

  if (!resumeData) return <div>Loading...</div>;

  const { personalInfo, profile, experience, skills, education } = resumeData;

  return (
    <div className="bg-background min-h-screen p-4 md:p-8 flex justify-center items-start text-foreground">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* Left Column - Sticky */}
        <div className="md:w-1/3   md:sticky md:top-8  md:overflow-auto">
          <div className="p-6 flex items-center gap-4">
            <ModeToggle /> Mode
          </div>

          <div className="p-6 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl mb-2 font-bold">
                {personalInfo.name} {personalInfo.firstname}
              </h1>
              <p className="text-xl mt-2 mb-2">{personalInfo.title}</p>
              <Image
                src={`${personalInfo.photo.asset.url}`}
                alt="profile"
                className="w-32 h-32  mx-auto mb-4 object-contain"
                width={100}
                height={100}
              />
            </div>
            <div>
              <div className="text-2xl mb-2 font-semibold  flex items-center border-y-2 border-black dark:border-white">
                <Book className="mr-2" /> Profil
              </div>

              <div className="space-y-4">
                <p>{profile}</p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center border-y-2 border-black dark:border-white">
                <User className="mr-2" /> Contact
              </h2>
              <ul className="space-y-2">
                <li className="flex items-center group">
                  <Mail
                    className="mr-2 group-hover:text-primary transition-colors duration-300"
                    size={18}
                  />
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="hover:underline"
                  >
                    {personalInfo.email}
                  </a>
                </li>
                <li className="flex items-center group">
                  <Phone
                    className="mr-2 group-hover:text-primary transition-colors duration-300"
                    size={18}
                  />
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="hover:underline"
                  >
                    {personalInfo.phone}
                  </a>
                </li>
                <li className="flex items-center group">
                  <Linkedin
                    className="mr-2 group-hover:text-primary transition-colors duration-300"
                    size={18}
                  />
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Profil LinkedIn
                  </a>
                </li>
                <li className="flex items-center group">
                  <MapPin
                    className="mr-2 group-hover:text-primary transition-colors duration-300"
                    size={18}
                  />
                  <span>{personalInfo.location}</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-semibold flex items-center border-y-2 border-black dark:border-white">
                <Wrench className="mr-2" /> Compétences
              </h2>
              <div>
                <h3 className="text-lg font-semibold mb-2">Informatique</h3>
                <ul className="list-disc list-inside">
                  {skills.softwareSkills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Langues</h3>
                <ul className="list-disc list-inside">
                  {skills.languages.map((language, idx) => (
                    <li key={idx}>{language}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Scrollable */}
        <div className="md:w-2/3 space-y-6 p-6 ">
          {/* Profil Section */}

          {/* Expériences Section */}
          <Accordion type="single" collapsible>
            <AccordionItem value="education">
              <AccordionTrigger className="flex text-nowrap text-left  font-semibold text-2xl p-4 border-y-2 border-black dark:border-white">
                <div className="flex items-center w-2/3">
                  <Briefcase className="mr-2" />
                  <h3>Experience</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="py-4">
                {" "}
                {experience.map((job, index) => (
                  <div key={index} className="flex gap-2 ">
                    <div className="flex flex-col items-center   ">
                      <Dot />
                      <div className="w-px h-full bg-[#000000]"></div>
                    </div>
                    <div className="pb-4">
                      <h3 className="text-lg font-semibold">{job.jobTitle}</h3>
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
              <AccordionTrigger className="flex text-nowrap text-left font-semibold text-2xl p-4 border-y-2 border-black dark:border-white">
                <div className="flex items-center w-2/3">
                  <GraduationCap className="mr-2 " />
                  <h3>Education</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="py-4">
                {education.map((edu, index) => (
                  <div key={index} className="flex gap-2 ">
                    <div className="flex flex-col items-center   ">
                      <Dot />
                      <div className="w-px h-full bg-[#000000]"></div>
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
              <AccordionTrigger className="flex text-nowrap text-left  font-semibold text-2xl p-4 border-y-2 border-black dark:border-white">
                <div className="flex items-center w-2/3">
                  <Award className="mr-2" />
                  <h3>Certifications</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="py-4">
                {education.map((edu, index) => (
                  <div key={index} className="flex gap-2 ">
                    <div className="flex flex-col items-center   ">
                      <Dot />
                      <div className="w-px h-full bg-[#000000]"></div>
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
        </div>
      </div>
    </div>
  );
}
