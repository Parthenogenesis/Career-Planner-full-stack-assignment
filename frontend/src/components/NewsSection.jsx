// frontend/src/components/NewsSection.jsx

function formatTime(unixSeconds) {
  if (!unixSeconds) return "";
  const date = new Date(unixSeconds * 1000);
  return date.toLocaleString();
}

function NewsSection({ stories }) {
  if (!stories || stories.length === 0) {
    return <p>Loading latest tech stories...</p>;
  }

  return (
    <div className="card news-list">
      {stories.map((story) => (
        <article key={story.id} className="news-item">
          <h3>
            <a href={story.url} target="_blank" rel="noreferrer">
            {story.title}
          </a>
          </h3>
          <p className="news-meta">
            <span>By: {story.by}</span>
            <span>Score: {story.score}</span>
            <span>{formatTime(story.time)}</span>
            <span>Type: {story.type}</span>
          </p>
        </article>
      ))}
    </div>
  );
}

export default NewsSection;
