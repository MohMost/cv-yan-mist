"use client";

import { FloatingDock } from "@/components/ui/floating-dock";

import { Phone, Mail, MapPin } from "lucide-react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";
export interface Resume {
  personalInfo: PersonalInfo;
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
export function FloatingDockDemo() {
  const [resumeData, setResumeData] = useState<Resume | null>(null);

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
       
        }`
      )
      .then((data) => {
        // Assigne toutes les données du premier document de type resume à l'état
        const resumeData = data[0];
        setResumeData(resumeData);
      })
      .catch(console.error);
  }, []);
  const links = [
    {
      title: "Email",
      icon: <Mail className="h-full w-full text-neutral-300" />,
      href: `mailto:${resumeData?.personalInfo?.email || ""}`,
    },
    {
      title: "+33 7 81 64 49 99",
      icon: <Phone className="h-full w-full text-neutral-300" />,
      href: `tel:${resumeData?.personalInfo?.phone}`,
    },

    {
      title: "Linkedin",
      icon: <LinkedInLogoIcon className="h-full w-full text-neutral-300" />,
      href: `${resumeData?.personalInfo?.linkedin}`,
    },
    {
      title: "Adresse",
      icon: <MapPin className="h-full w-full text-neutral-300" />,
      href: "https://www.google.com/search?client=opera-gx&q=10+rue+Henri+Poincar%C3%A9+-13388+Marseille&sourceid=opera&ie=UTF-8&oe=UTF-8",
    },
  ];
  return (
    <div className="flex items-center justify-center   w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
