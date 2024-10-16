"use client";

import * as React from "react";
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
  ChevronDown,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ModeToggle } from "./ThemeToggler";

export default function Resume() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-background min-h-screen p-4 md:p-8 flex justify-center items-start text-foreground">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* Left Column - Sticky */}
        <Card className="md:w-1/3 bg-primary text-primary-foreground md:sticky md:top-8 md:h-fit md:overflow-auto">
          <ModeToggle />
          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-secondary" />
              <h1 className="text-3xl font-bold">Yanis IDIR</h1>
              <p className="text-xl mt-2">Étudiant en Génie Mécanique</p>
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
                    href="mailto:Yanis.idir001@gmail.com"
                    className="hover:underline"
                  >
                    Yanis.idir001@gmail.com
                  </a>
                </li>
                <li className="flex items-center group">
                  <Phone
                    className="mr-2 group-hover:text-secondary transition-colors duration-300"
                    size={18}
                  />
                  <a href="tel:+33781644999" className="hover:underline">
                    +33 7 81 64 49 99
                  </a>
                </li>
                <li className="flex items-center group">
                  <Linkedin
                    className="mr-2 group-hover:text-secondary transition-colors duration-300"
                    size={18}
                  />
                  <a
                    href="https://linkedin.com/in/yanis-i-212bb71b9/"
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
                  <span>Marseille, FRANCE</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Scrollable */}
        <div className="md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                <Book className="mr-2" /> Profil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p>
                  Étudiant en deuxième année de Master, je souhaite postuler
                  pour un contrat étudiant afin d&apos;approfondir mon
                  expérience professionnelle et subvenir à mes besoins.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                <Briefcase className="mr-2" /> Expériences Professionnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Employé polyvalent au RU du CROUS de Château Gombert
                </h3>
                <p className="text-muted-foreground">
                  Marseille, FRANCE | Sept. 2023 – juillet 2024
                </p>
                <ul className="list-disc list-inside mt-2">
                  <li>J&apos;ai travaillé en plonge principalement</li>
                  <li>
                    J&apos;ai effectué des tâches de réapprovisionnement et
                    nettoyage
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Employé polyvalent chez Burger King La Rose
                </h3>
                <p className="text-muted-foreground">
                  Marseille, FRANCE | Sept. 2021 - Dec. 2021
                </p>
                <ul className="list-disc list-inside mt-2">
                  <li>
                    J&apos;ai travaillé en équipe pour assurer le bon
                    fonctionnement du restaurant, notamment lors des fermetures
                    (contrat à 24h/semaine)
                  </li>
                  <li>
                    Mes responsabilités comprenaient la préparation des
                    aliments, le nettoyage des espaces, l&aposaccueil
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

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
                    <li>Excel, PowerPoint, Word</li>
                    <li>Photoshop</li>
                    <li>Logiciels CAO (3D Experience, CATIA, SolidWorks)</li>
                    <li>Autre (draw.io…)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Langues</h3>
                  <ul className="list-disc list-inside">
                    <li>Français: Langue Maternelle</li>
                    <li>Anglais: Niveau avancé</li>
                    <li>Arabe: Bon niveau</li>
                    <li>Kabyle: Langue Maternelle</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                <GraduationCap className="mr-2" /> Formation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Master 1 – Génie Mécanique | Aix Marseille
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Marseille, FRANCE | 2023 - 2024
                    </p>
                    <p>
                      Année validée. Apprentissage par problèmes, cours de CAO,
                      TP et réalisation de plusieurs projets.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Licence 3 SPI – Ingénierie Mécanique | Aix Marseille
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Marseille, FRANCE | 2021 - 2023
                    </p>
                    <p>
                      Année validée. Mécanique des fluides, Thermodynamique,
                      Vibrations, RDM…
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Licence 2 – Génie Mécanique | UMMTO
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Tizi-Ouzou, Algérie | 2019 - 2020
                    </p>
                    <p>
                      Année validée. Mécanique des milieux continus,
                      Mathématiques, Conception mécanique, mécanique générale…
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
