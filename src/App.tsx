import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import sampleApplications from "./sampleData";
import { isApplicationList } from "./validators";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ApplicationForm from "./components/ApplicationForm";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import ApplicationList from "./components/ApplicationList";
import type {
  Application,
  ApplicationFormData,
  FilterOption,
  Status,
} from "./types";

function App() {
  const [applications, setApplications] = useLocalStorage<Application[]>(
    "jobTracker.applications",
    sampleApplications,
    isApplicationList
  );

  const [searchText, setSearchText] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<FilterOption>("All");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(
    null
  );

  function handleSaveApplication(formData: ApplicationFormData) {
    if (editingApplication) {
      const updatedApplications = applications.map((app) =>
        app.id === editingApplication.id ? { ...app, ...formData } : app
      );
      setApplications(updatedApplications);
    } else {
      const newApplication: Application = { id: Date.now(), ...formData };
      setApplications([newApplication, ...applications]);
    }
    closeForm();
  }

  function handleDeleteApplication(id: number) {
    const application = applications.find((app) => app.id === id);
    if (!application) {
      return;
    }

    const confirmed = window.confirm(`Delete the application for ${application.company}?`);
    if (!confirmed) {
      return;
    }
    setApplications(applications.filter((app) => app.id !== id));

    if (editingApplication && editingApplication.id === id) {
      closeForm();
    }
  }

  function handleStatusChange(id: number, newStatus: Status) {
    const updatedApplications = applications.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);
  }

  function handleEditClick(application: Application) {
    setEditingApplication(application);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAddClick() {
    setEditingApplication(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingApplication(null);
  }

  const searchWords = searchText.trim().toLowerCase();
  const visibleApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchWords) ||
      app.jobTitle.toLowerCase().includes(searchWords);
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Navbar />
      <main className="container">
        <Dashboard applications={applications} />

        {showForm ? (
          <ApplicationForm
            key={editingApplication ? editingApplication.id : "new"}
            initialData={editingApplication}
            onSave={handleSaveApplication}
            onCancel={closeForm}
          />
        ) : (
          <button className="btn btn-primary add-btn" onClick={handleAddClick}>
            + Add Application
          </button>
        )}

        <section className="toolbar">
          <SearchBar searchText={searchText} onSearchChange={setSearchText} />
          <FilterBar selectedStatus={statusFilter} onFilterChange={setStatusFilter} />
        </section>

        <ApplicationList
          applications={visibleApplications}
          totalCount={applications.length}
          onEdit={handleEditClick}
          onDelete={handleDeleteApplication}
          onStatusChange={handleStatusChange}
        />
      </main>
    </>
  );
}

export default App;
