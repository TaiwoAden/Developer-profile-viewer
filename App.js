import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import RepoList from './components/RepoList';
import ToggleTheme from './components/ToggleTheme';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const fetchGitHubData = async (user) => {
    setLoading(true);
    setError('');
    setProfile(null);
    setRepos([]);

    try {
      const profileRes = await axios.get(`https://api.github.com/users/${user}`);
      const reposRes = await axios.get(`https://api.github.com/users/${user}/repos`);
      setProfile(profileRes.data);
      setRepos(reposRes.data);
      const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
      const updatedHistory = [user, ...history.filter(u => u !== user)].slice(0, 5);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    } catch (err) {
      setError('User not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <ToggleTheme theme={theme} setTheme={setTheme} />
      <SearchBar onSearch={fetchGitHubData} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {profile && <ProfileCard profile={profile} />}
      {repos.length > 0 && <RepoList repos={repos} />}
    </div>
  );
}

export default App;
