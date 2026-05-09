import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import { useEffect, useState } from "react";
import { ROUTES } from "./config/routes";
import { Theme } from "./enums/theme.ts";

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      return savedTheme;
    }

    // Load theme from system as default
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? Theme.Dark
      : Theme.Light;
  });

  useEffect(() => {
    // Apply current theme
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === Theme.Dark);

    // Save current theme
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header theme={theme} setTheme={setTheme} />
        <main>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home theme={theme} />} />
            <Route path={ROUTES.PROJECTS} element={<Projects />} />
            <Route path={ROUTES.PROJECT_DETAILS} element={<ProjectDetails />} />
            <Route path={ROUTES.CONTACT} element={<Contact theme={theme} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer theme={theme} />
      </div>
    </Router>
  );
}

export default App;
