import { STATUSES } from "./constants";
import type { Application, Status } from "./types";



function isApplication(item: unknown): item is Application {
  if (typeof item !== "object" || item === null) {
    return false;
  }
  const app = item as Record<string, unknown>;

  return (
    typeof app.id === "number" &&
    typeof app.company === "string" &&
    typeof app.jobTitle === "string" &&
    typeof app.location === "string" &&
    typeof app.appliedDate === "string" &&
    STATUSES.includes(app.status as Status) &&
    typeof app.jobLink === "string" &&
    typeof app.notes === "string"
  );
}

export function isApplicationList(value: unknown): value is Application[] {
  return Array.isArray(value) && value.every(isApplication);
}

export function isTheme(value: unknown): boolean {
  return value === "light" || value === "dark";
}
