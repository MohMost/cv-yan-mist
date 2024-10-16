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
  Code,
  User,
  GraduationCap,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "./ThemeToggler";
export interface PersonalInfo {
  name: string;
  firstname: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
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
          personalInfo,
          profile,
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
        <Card className="md:w-1/3 bg-primary text-primary-foreground md:sticky md:top-8 md:h-fit md:overflow-auto">
          <ModeToggle />
          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-secondary" />
              <h1 className="text-3xl font-bold">
                {personalInfo.name} {personalInfo.firstname}
              </h1>
              <p className="text-xl mt-2">{personalInfo.title}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center">
                <User className="mr-2" /> Contact
              </h2>
              <ul className="space-y-2">
                <li className="flex items-center group">
                  <Mail
                    className="mr-2 group-hover:text-secondary transition-colors duration-300"
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
                    className="mr-2 group-hover:text-secondary transition-colors duration-300"
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
                    className="mr-2 group-hover:text-secondary transition-colors duration-300"
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
                    className="mr-2 group-hover:text-secondary transition-colors duration-300"
                    size={18}
                  />
                  <span>{personalInfo.location}</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Scrollable */}
        <div className="md:w-2/3 space-y-6">
          {/* Profil Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                <Book className="mr-2" /> Profil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{profile}</p>
            </CardContent>
          </Card>

          {/* Expériences Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                <Briefcase className="mr-2" /> Expériences Professionnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {experience.map((job, index) => (
                <div key={index}>
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
              ))}
            </CardContent>
          </Card>

          {/* Compétences Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                <Code className="mr-2" /> Compétences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Logiciels</h3>
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
            </CardContent>
          </Card>

          {/* Formation Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                <GraduationCap className="mr-2" /> Formation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {education.map((edu, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>
                      {edu.degree} | {edu.institution}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">
                        {edu.location} | {edu.dateRange}
                      </p>
                      <p>{edu.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
