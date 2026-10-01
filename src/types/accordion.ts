import type {Education, EducationData, Experience, ExperienceData} from "@/types/content.ts";

interface CompType {
  education: boolean;
  experience: boolean;
}

type CompTypeKey = keyof CompType;
type ContentList = Experience | Education;
type ContentData = ExperienceData | EducationData | undefined;

export type {CompType, CompTypeKey, ContentList, ContentData};
