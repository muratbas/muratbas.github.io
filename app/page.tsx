import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#209CEE] selection:text-white">
      <Navbar />
      <main className="pt-20 flex-grow">
        <Hero />
        <Projects />
        <TechStack />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
