// frontend/src/components/SkillGapResults.jsx

function SkillGapResults({ result, loading }) {
  if (loading && !result) {
    return <p>Analyzing your skills...</p>;
  }

  if (!result) {
    return <p>Submit the form to see your skill gap analysis.</p>;
  }

  return (
    <div className="card">
      <p>
        <strong>Target Role:</strong> {result.targetRole}
      </p>
      <p>
        <strong>Required Skills:</strong>{" "}
        {result.requiredSkills?.join(", ") || "—"}
      </p>
      <p>
        <strong>Matched Skills:</strong>{" "}
        {result.matchedSkills?.length
          ? result.matchedSkills.join(", ")
          : "None matched yet — good place to start!"}
      </p>
      <p>
        <strong>Missing Skills:</strong>{" "}
        {result.missingSkills?.length
          ? result.missingSkills.join(", ")
          : "No gaps — focus on deeper projects and interviews."}
      </p>

      {result.recommendations?.length > 0 && (
        <div className="list-block">
          <strong>Recommendations:</strong>
          <ul>
            {result.recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      {result.suggestedLearningOrder?.length > 0 && (
        <div className="list-block">
          <strong>Suggested Learning Order:</strong>
          <ol>
            {result.suggestedLearningOrder.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default SkillGapResults;
