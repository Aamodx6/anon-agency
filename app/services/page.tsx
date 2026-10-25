import { Footer } from '@/components/Footer';
import { CtaBand } from '@/components/CtaBand';
import { HowWeWork } from '@/components/HowWeWork';
import { ServicesExperience } from '@/components/ServicesExperience';

export default function ServicesPage() {
  return (
    <main id="main">
      <ServicesExperience />
      <HowWeWork />
      <CtaBand spacing="page" />
      <Footer />
    </main>
  );
}
