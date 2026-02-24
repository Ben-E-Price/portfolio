interface AboutData {
  about: string;
  skills: string[];

  contact: {
    "email": string;
    github: string;
  };
}

interface Experience {
  "location": string;
  "description": string;
  "year": string;
}

interface Qualification {
  "title": string;
  "grade": string;
}

interface Education extends Experience {
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
  "experience": Experience[];
  "education": Education[];
  "liveExample": LiveExample[];
}

export type {AboutData, Experience, Education, LiveExample, SiteContent};
