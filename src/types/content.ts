interface AboutData {
  about: string;
  skills: string[];
  contact: ContactData;
}

interface ContactData {
  "email": string;
  github: string;
}

interface ExperienceData {
  "location": string;
  "description": string;
  "year": string;
}

type Experience = ExperienceData[];

interface Qualification {
  "title": string;
  "grade": string;
}

interface Education extends ExperienceData {
  "qualification": Qualification[];
}

interface LiveExample {
  "linkLive": string;
  "linkRepo": string;
  "title": string;
  "description": string;
}


interface SiteContent {
  "about": AboutData;
  "experience": Experience;
  "education": Education[];
  "liveExample": LiveExample[];
}

export type {AboutData, ContactData, Experience, Education, LiveExample, SiteContent};
