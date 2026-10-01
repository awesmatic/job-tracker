import ApplicationCard from "./ApplicationCard";
import type { Application, Status } from "../types";

interface ApplicationListProps {
  applications: Application[];
  totalCount: number;
  onEdit: (application: Application) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, newStatus: Status) => void;
}

function ApplicationList({
  applications,
  totalCount,
  onEdit,
  onDelete,
  onStatusChange,
}: ApplicationListProps) {
  if (totalCount === 0) {
    return (
      <p className="empty-message">
        No applications yet. Click "Add Application" to save your first one.
      </p>
    );
  }

  if (applications.length === 0) {
    return <p className="empty-message">No applications match your search or filter.</p>;
  }

  return (
    <div className="app-list">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default ApplicationList;
