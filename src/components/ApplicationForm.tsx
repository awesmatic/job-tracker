import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { STATUSES } from "../constants";
import type { Application, ApplicationFormData, FormErrors } from "../types";


const emptyForm: ApplicationFormData = {
  company: "",
  jobTitle: "",
  location: "",
  appliedDate: "",
  status: "Applied",
  jobLink: "",
  notes: "",
};

interface ApplicationFormProps {
  initialData: Application | null;
  onSave: (formData: ApplicationFormData) => void;
  onCancel: () => void;
}


function ApplicationForm({ initialData, onSave, onCancel }: ApplicationFormProps) {

  const [formData, setFormData] = useState<ApplicationFormData>(
    initialData || emptyForm
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const companyInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    companyInputRef.current?.focus();
  }, []);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    if (formData.company.trim() === "") {
      newErrors.company = "Company name is required";
    }
    if (formData.jobTitle.trim() === "") {
      newErrors.jobTitle = "Job title is required";
    }
    if (formData.appliedDate === "") {
      newErrors.appliedDate = "Applied date is required";
    }
    if (!STATUSES.includes(formData.status)) {
      newErrors.status = "Status is required";
    }
    const link = formData.jobLink.trim();
    if (link !== "" && !link.startsWith("http://") && !link.startsWith("https://")) {
      newErrors.jobLink = "Link must start with http:// or https://";
    }
    return newErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSave({
      ...formData,
      company: formData.company.trim(),
      jobTitle: formData.jobTitle.trim(),
      location: formData.location.trim(),
      jobLink: formData.jobLink.trim(),
      notes: formData.notes.trim(),
    });
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <h2>{initialData ? "Edit Application" : "Add Application"}</h2>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="company">Company Name *</label>
          <input
            id="company"
            name="company"
            className="input"
            type="text"
            placeholder="e.g. TCS"
            value={formData.company}
            onChange={handleChange}
            ref={companyInputRef}
          />
          {errors.company && <p className="error-text">{errors.company}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="jobTitle">Job Title *</label>
          <input
            id="jobTitle"
            name="jobTitle"
            className="input"
            type="text"
            placeholder="e.g. React Developer"
            value={formData.jobTitle}
            onChange={handleChange}
          />
          {errors.jobTitle && <p className="error-text">{errors.jobTitle}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            className="input"
            type="text"
            placeholder="e.g. Pune"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="appliedDate">Applied Date *</label>
          <input
            id="appliedDate"
            name="appliedDate"
            className="input"
            type="date"
            value={formData.appliedDate}
            onChange={handleChange}
          />
          {errors.appliedDate && <p className="error-text">{errors.appliedDate}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            className="input"
            value={formData.status}
            onChange={handleChange}
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && <p className="error-text">{errors.status}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="jobLink">Job Link</label>
          <input
            id="jobLink"
            name="jobLink"
            className="input"
            type="text"
            placeholder="https://example.com"
            value={formData.jobLink}
            onChange={handleChange}
          />
          {errors.jobLink && <p className="error-text">{errors.jobLink}</p>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          className="input"
          rows={3}
          placeholder="e.g. Applied through company website."
          value={formData.notes}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? "Save Changes" : "Add Application"}
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ApplicationForm;
