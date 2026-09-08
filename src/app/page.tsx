import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import Story from "@/components/Story";
import Details from "@/components/Details";
import Schedule from "@/components/Schedule";
import DressCode from "@/components/DressCode";
import PhotoBand from "@/components/PhotoBand";
import Travel from "@/components/Travel";
import Registry from "@/components/Registry";
import Rsvp from "@/components/Rsvp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      <Nav />
      <Hero />
      <Quote />
      <Story />
      <Details />
      <Schedule />
      <DressCode />
      <PhotoBand />
      <Travel />
      <Registry />
      <Rsvp />
      <Footer />
    </div>
  );
}
