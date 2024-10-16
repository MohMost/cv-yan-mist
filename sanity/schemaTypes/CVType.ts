import { defineField, defineType } from "sanity";

export const resumeType = defineType({
  name: "resume",
  title: "CV",
  type: "document",

  fields: [
    defineField({
      name: "personalInfo",
      title: "Informations Personnelles",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Nom",
          type: "string",
        }),
        defineField({
          name: "firstname",
          title: "Prenom",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Titre",
          type: "string",
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
        }),
        defineField({
          name: "phone",
          title: "Téléphone",
          type: "string",
        }),
        defineField({
          name: "linkedin",
          title: "Profil LinkedIn",
          type: "url",
        }),
        defineField({
          name: "location",
          title: "Localisation",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "profile",
      title: "Profil Professionnel",
      type: "text",
    }),
    defineField({
      name: "experience",
      title: "Expériences Professionnelles",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "jobTitle",
              title: "Poste",
              type: "string",
            }),

            defineField({
              name: "location",
              title: "Localisation",
              type: "string",
            }),
            defineField({
              name: "dateRange",
              title: "Période",
              type: "string",
            }),
            defineField({
              name: "responsibilities",
              title: "Responsabilités",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "skills",
      title: "Compétences",
      type: "object",
      fields: [
        defineField({
          name: "softwareSkills",
          title: "Compétences Logicielles",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "languages",
          title: "Langues",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
    defineField({
      name: "education",
      title: "Formation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "degree",
              title: "Diplôme",
              type: "string",
            }),
            defineField({
              name: "institution",
              title: "Établissement",
              type: "string",
            }),
            defineField({
              name: "location",
              title: "Localisation",
              type: "string",
            }),
            defineField({
              name: "dateRange",
              title: "Période",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
          ],
        },
      ],
    }),
  ],
});
