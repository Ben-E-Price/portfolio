export interface About {
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
  "link-live": string;
  "link-repo": string;
  "title": string;
  "description": string;
}


export interface SiteContent {
  "about": About;
  "experience": Experience[];
  "education": Education[];
  "live-example": LiveExample[];
}
