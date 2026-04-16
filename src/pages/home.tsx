import { motion } from "framer-motion";
import BackToTop from "@/components/layout/back-to-top";
import CvDownloadHandler from "@/components/layout/cv-download-handler";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import EnterpriseIntegration from "@/components/sections/enterprise-integration";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Differentials from "@/components/sections/differentials";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="page-shell min-h-[100dvh] bg-background text-foreground selection:bg-primary/30">
      <div className="relative z-10">
        <CvDownloadHandler />
        <Navbar />
        <BackToTop />
        <main>
          <Hero />
          <About />
          <Skills />
          <EnterpriseIntegration />
          <Projects />
          <Experience />
          <Differentials />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
