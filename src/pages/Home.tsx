import { Hero } from "../components/sections/Hero";
import { Features } from "../components/sections/Features";
import { GlobalSpend } from "../components/sections/GlobalSpend";
import { Metrics } from "../components/sections/Metrics";
import { Testimonials } from "../components/sections/Testimonials";
import { FAQ } from "../components/sections/FAQ";
import { CTA } from "../components/sections/CTA";

export function Home() {
  return (
    <>
      <Hero />
      <Features />
      <GlobalSpend />
      <Metrics />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
