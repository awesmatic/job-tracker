import { STATUSES } from "../constants";
import type { Application, Status } from "../types";

function formatDate(dateString: string): string {
  const day = dateString.slice(0, 2);
  const month = dateString.slice(2, 4);
  const year = dateString.slice(4);
  return `${day}/${month}/${year}`;
}

interface ApplicationCardProps {
  application: Application;
  onEdit: (application: Application) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, newStatus: Status) => void;
}


function ApplicationCard({
  application,
  onEdit,
  onDelete,
  onStatusChange,
}: ApplicationCardProps) {
  const { id, company, jobTitle, location, appliedDate, status, jobLink, notes } =
    application;

  return (
    <article className="app-card">
      <div className="app-card-top">
        <div>
          <h3 className="app-company">{company}</h3>
          <p className="app-title">{jobTitle}</p>
        </div>
        <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>
      </div>

      <ul className="app-details">
        {location && <li>📍 {location}</li>}
        <li>📅 Applied on {formatDate(appliedDate)}</li>
        {jobLink && (
          <li>
            🔗{" "}
            <a href={jobLink} target="_blank" rel="noopener noreferrer">
              View job posting
            </a>
          </li>
        )}
      </ul>

      {notes && <p className="app-notes">{notes}</p>}

      <div className="app-actions">
        <select
          className="input status-select"
          aria-label={`Change status for ${company}`}
          value={status}
          onChange={(event) => onStatusChange(id, event.target.value as Status)}
        >
          {STATUSES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button className="btn btn-outline" onClick={() => onEdit(application)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default ApplicationCard;
