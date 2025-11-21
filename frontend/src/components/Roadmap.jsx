// frontend/src/components/Roadmap.jsx

function Roadmap({ result, loading }) {
  if (loading && !result) {
    return <p>Generating roadmap...</p>;
  }

  if (!result) {
    return <p>Submit the form to see your career roadmap.</p>;
  }

  return (
    <div className="card">
      <p>
        <strong>Target Role:</strong> {result.targetRole}
      </p>
      {result.phases?.map((phase) => (
        <div key={phase.phase} className="roadmap-phase">
          <h3>{phase.phase}</h3>
          <p>
            <strong>Duration:</strong> {phase.duration}
          </p>
          <p>
            <strong>Focus Areas:</strong> {phase.focus.join(", ")}
          </p>
          <p>{phase.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Roadmap;
