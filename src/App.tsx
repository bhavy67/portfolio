import { usePageLoader } from './hooks/useCustomHooks';
import { ThemeProvider } from './context/ThemeContext';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Blogs from './sections/Blogs';
import Contact from './sections/Contact';

function App() {
  const isLoading = usePageLoader(2500);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Experience />
          <Education />
          <Skills />
          <Projects />
          <Blogs />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
