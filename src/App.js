// React Basics: Expanding Our Multi-Page Website
// This adds Local Storage, useEffect, and Context API for state management.

import React, { useState, useEffect, createContext, useContext } from 'react';

// 🔹 Step 1: Create Context for Theme
// This allows any component to access the theme without prop drilling.
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Load theme from local storage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // When theme changes, save it in local storage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use ThemeContext easily
const useTheme = () => useContext(ThemeContext);

// 🔹 Step 2: Header Component
// Displays the website title and a theme toggle button.
const Header = ({ title }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header
      style={{
        background: theme === 'light' ? '#222' : '#ddd',
        color: theme === 'light' ? 'white' : 'black',
        padding: '15px',
        textAlign: 'center',
      }}
    >
      <h1>{title}</h1>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        style={{ marginTop: '10px' }}
      >
        Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
};

// 🔹 Step 3: Navigation Component
// Lets users switch between pages and saves last visited page.
const Navigation = ({ setPage }) => {
  return (
    <nav style={{ textAlign: 'center', margin: '10px' }}>
      <button onClick={() => setPage('Home')} style={{ margin: '5px' }}>Home</button>
      <button onClick={() => setPage('About')} style={{ margin: '5px' }}>About</button>
      <button onClick={() => setPage('Services')} style={{ margin: '5px' }}>Services</button>
      <button onClick={() => setPage('Contact')} style={{ margin: '5px' }}>Contact</button>
    </nav>
  );
};

// 🔹 Step 4: Page Components
// Each function represents a different "page" of the website.
const Home = () => <section><h2>Home</h2><p>Welcome! This is the homepage.</p></section>;
const About = () => <section><h2>About Us</h2><p>We are a company that does things.</p></section>;
const Services = () => <section><h2>Our Services</h2><p>Here’s what we offer.</p></section>;
const Contact = () => <section><h2>Contact</h2><p>Reach out to us here.</p></section>;

// 🔹 Step 5: Main Website Component
// Manages which page is displayed using state and saves it in local storage.
const Website = () => {
  const [page, setPage] = useState(localStorage.getItem('lastPage') || 'Home');

  // Whenever the page changes, save it in local storage
  useEffect(() => {
    localStorage.setItem('lastPage', page);
  }, [page]);

  return (
    <div>
      <Header title="My React Website" />
      <Navigation setPage={setPage} />
      <main style={{ padding: '20px', textAlign: 'center' }}>
        {page === 'Home' && <Home />}
        {page === 'About' && <About />}
        {page === 'Services' && <Services />}
        {page === 'Contact' && <Contact />}
      </main>
    </div>
  );
};

// 🔹 Step 6: App Component
// Wraps everything in ThemeProvider to enable global theme access.
const App = () => {
  return (
    <ThemeProvider>
      <Website />
    </ThemeProvider>
  );
};

export default App;

// 🔥 What Students Should Learn from This:
// 1. How to persist state using local storage.
// 2. How useEffect syncs state with storage automatically.
// 3. Why Context API is better for managing global state.
// 4. How to toggle themes and keep the preference saved across refreshes.

