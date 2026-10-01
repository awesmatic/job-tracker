
export type Status = "Applied" | "Interview" | "Selected" | "Rejected";


export type FilterOption = "All" | Status;

export type Theme = "light" | "dark";

export interface Application {
  id: number;
  company: string;
  jobTitle: string;
  location: string;
  appliedDate: string;
  status: Status;
  jobLink: string;
  notes: string;
}


export type ApplicationFormData = Omit<Application, "id">;


export type FormErrors = Partial<Record<keyof ApplicationFormData, string>>;
