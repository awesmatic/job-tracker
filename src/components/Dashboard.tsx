import { STATUSES } from "../constants";
import type { Application, Status } from "../types";

interface DashboardProps {
  applications: Application[];
}

function Dashboard({ applications }: DashboardProps) {
  function countByStatus(status: Status): number {
    return applications.filter((app) => app.status === status).length;
  }

  return (
    <section className="dashboard">
      <div className="stat-card">
        <span className="stat-number">{applications.length}</span>
        <span className="stat-label">Total Applications</span>
      </div>

      {STATUSES.map((status) => (
        <div key={status} className="stat-card">
          <span className="stat-number">{countByStatus(status)}</span>
          <span className="stat-label">{status}</span>
        </div>
      ))}
    </section>
  );
}

export default Dashboard;
