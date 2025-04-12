import React, { useState } from 'react';

function RepoList({ repos }) {
  const [sortKey, setSortKey] = useState('stars');

  const sortedRepos = [...repos].sort((a, b) => {
    switch (sortKey) {
      case 'stars':
        return b.stargazers_count - a.stargazers_count;
      case 'forks':
        return b.forks_count - a.forks_count;
      case 'updated':
        return new Date(b.updated_at) - new Date(a.updated_at);
      default:
        return 0;
    }
  });

  return (
    <div>
      <h3>Repositories</h3>
      <select onChange={(e) => setSortKey(e.target.value)}>
        <option value="stars">Stars</option>
        <option value="forks">Forks</option>
        <option value="updated">Last Updated</option>
      </select>
      <ul>
        {sortedRepos.slice(0, 10).map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
            <p>{repo.description}</p>
            <p>Stars: {repo.stargazers_count} | Forks: {repo.forks_count}</p>
            <p>Language: {repo.language}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepoList;
