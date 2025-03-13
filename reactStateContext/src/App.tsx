import { useState, useEffect, createContext, useContext } from 'react';

/* =======================================================
   Type Definitions
========================================================== */

/**
 * Defines the types for the theme context, specifying what values the context will provide.
 * - `theme`: The current theme (e.g., 'light' or 'dark')
 * - `setTheme`: A function to update the theme.
 */
type ThemeContextType = {
    theme: string;
    setTheme: (theme: string) => void;
};

/**
 * Props for ThemeProvider component.
 * - `children`: The child elements/components that the provider will wrap.
 */
type ThemeProviderProps = {
    children: React.ReactNode;
};

/**
 * Props for the Header component.
 * - `title`: The title to display in the header.
 */
type HeaderProps = {
    title: string;
};

/**
 * Props for the Navigation component.
 * - `setPage`: A function to update the current page.
 */
type NavigationProps = {
    setPage: (page: string) => void;
};

/* =======================================================
   Theme Context and Provider
========================================================== */

/**
 * Provides default values for the context to handle scenarios where it might be used
 * without a wrapping provider. This prevents TypeScript errors and runtime crashes.
 */
const defaultThemeContext = { theme: 'light', setTheme: () => {} };
const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

/**
 * ThemeProvider component that manages the theme state and persists it to local storage.
 * It provides the theme state and setter function to its child components via context.
 *
 * Props:
 * - `children`: The child components that will have access to the context.
 */
const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light');

    // Effect to store the theme in local storage whenever it changes.
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * Custom hook to simplify the usage of theme context in components.
 * Returns the theme context value which includes both the theme string and the setTheme function.
 */
const useTheme = () => useContext(ThemeContext);

/* =======================================================
   Components
========================================================== */

/**
 * Header component that displays the website's title and a button to toggle the theme.
 *
 * Props:
 * - `title`: The text to display as the website's title.
 */
const Header = ({ title }: HeaderProps) => {
    const { theme, setTheme } = useTheme();

    return (
        <header style={{
            background: theme === 'light' ? '#222' : '#ddd',
            color: theme === 'light' ? 'white' : 'black',
            padding: '15px',
            textAlign: 'center',
        }}>
            <h1>{title}</h1>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} style={{ marginTop: '10px' }}>
                Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
        </header>
    );
};

/**
 * Navigation component that provides buttons for changing pages.
 *
 * Props:
 * - `setPage`: Function to update the current page being displayed.
 */
const Navigation = ({ setPage }: NavigationProps) => {
    return (
        <nav style={{ textAlign: 'center', margin: '10px' }}>
            <button onClick={() => setPage('Home')} style={{ margin: '5px' }}>Home</button>
            <button onClick={() => setPage('About')} style={{ margin: '5px' }}>About</button>
            <button onClick={() => setPage('Services')} style={{ margin: '5px' }}>Services</button>
            <button onClick={() => setPage('Contact')} style={{ margin: '5px' }}>Contact</button>
        </nav>
    );
};

/**
 * Simple page components that render the content for each respective page.
 */
const Home = () => <section><h2>Home</h2><p>Welcome! This is the homepage.</p></section>;
const About = () => <section><h2>About Us</h2><p>We are a company that does things.</p></section>;
const Services = () => <section><h2>Our Services</h2><p>Here’s what we offer.</p></section>;
const Contact = () => <section><h2>Contact</h2><p>Reach out to us here.</p></section>;

/**
 * Main website component that manages which page is displayed.
 * Uses local storage to remember the last page visited.
 */
const Website = () => {
    const [page, setPage] = useState<string>(localStorage.getItem('lastPage') || 'Home');

    // Effect to store the last visited page in local storage.
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

/**
 * App component that wraps everything in the ThemeProvider.
 * This setup allows the theme context to be available throughout the application.
 */
const App = () => {
    return (
        <ThemeProvider>
            <Website />
        </ThemeProvider>
    );
};

export default App;
