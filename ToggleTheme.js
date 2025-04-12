import React from 'react';

function ToggleTheme({ theme, setTheme }) {
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}

export default ToggleTheme;
