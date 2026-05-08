import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import ProjectGallery from './components/ProjectGallery';
import LabGallery from './components/LabGallery';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white antialiased">
      <Navigation />
      <Hero />
      <ProjectsSection />
      <ProjectGallery />
      <LabGallery />
      <Footer />
    </div>
  );
}

export default App;
