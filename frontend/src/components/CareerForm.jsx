// frontend/src/components/CareerForm.jsx
import { useState } from "react";

const DEFAULT_ROLE = "Backend Developer";

function CareerForm({ onAnalyze, loading }) {
  const [targetRole, setTargetRole] = useState(DEFAULT_ROLE);
  const [skillsInput, setSkillsInput] = useState("Java, SQL, Git");

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentSkills = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    onAnalyze({ targetRole, currentSkills });
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="targetRole">Target Role</label>
        <select
          id="targetRole"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
        >
          <option>Backend Developer</option>
          <option>FrontendDeveloper</option>
          <option>Data Analyst</option>
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="skills">Current Skills (comma separated)</label>
        <textarea
          id="skills"
          rows={3}
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          placeholder="e.g., Java, SQL, Git"
        />
      </div>

      <button type="submit" className="primary-btn" disabled={loading}>
        {loading ? "Analyzing..." : "Analyze My Career Path"}
      </button>
    </form>
  );
}

export default CareerForm;
