import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
import { Navigation } from './components/Navigation/Navigation';
import { Hero } from './components/Hero/Hero';
import { Overview } from './components/Overview/Overview';
import { Schedule } from './components/Schedule/Schedule';
import { Themes } from './components/Themes/Themes';
import { Registration } from './components/Registration/Registration';
import { FAQ } from './components/FAQ/FAQ';
import { Contact } from './components/Contact/Contact';
import { About } from './components/About/About';
import { Footer } from './components/Footer/Footer';
import { GlowDivider } from './components/Common/Section';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Profile } from './components/Profile/Profile';

function App() {
  useScrollReveal();

  return (
    <Router>
      <CustomCursor />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navigation />
              <Hero />
              <GlowDivider />
              <Overview />
              <GlowDivider />
              <Schedule />
              <GlowDivider />
              <Themes />
              <GlowDivider />
              <Registration />
              <GlowDivider />
              <FAQ />
              <GlowDivider />
              <Contact />
              <GlowDivider />
              <About />
              <Footer />
            </>
          }
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
