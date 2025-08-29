import About from './components/About.jsx'
import Hero from './components/Hero.jsx'
import Navbar from './components/Navbar.jsx'
import Services from './components/Services.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  return (
    <main className= "relative min-h-screen w-screen overflow-x-hidden">
        <Navbar/>
        <Hero/>
        <About/>
        <Projects/>
        <Services/>
        <Contact />
        <Footer />
    </main>
  )
}

export default App