import { Hero } from "@/sections/Hero";
import { StatusIndicators } from "@/sections/StatusIndicators";
import { Shop } from "@/sections/Shop";
import { DownloadSection } from "@/sections/Download";
import { FAQ } from "@/sections/FAQ";
import { Testimonials } from "@/sections/Testimonials";
import { Changelog } from "@/sections/Changelog";
import { Discord } from "@/sections/Discord";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <StatusIndicators />
      <Shop />
      <DownloadSection />
      <Testimonials />
      <FAQ />
      <Changelog />
      <Discord />
      <Contact />
    </>
  );
}
