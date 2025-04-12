import React from 'react';

function ProfileCard({ profile }) {
  return (
    <div className="profile-card">
      <img src={profile.avatar_url} alt={profile.name} width="100" />
      <h2>{profile.name}</h2>
      <p>@{profile.login}</p>
      <p>{profile.location}</p>
      <p>{profile.bio}</p>
      <p>Followers: {profile.followers} | Following: {profile.following}</p>
      <a href={profile.html_url} target="_blank" rel="noreferrer">View Profile</a>
    </div>
  );
}

export default ProfileCard;
