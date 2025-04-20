import {
  ArrowRightIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import AnimatedHeroSection from "../components/AnimationHeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
import SALMAUniqueSection from "../components/SALMAUniqueSection";
import KeyFeaturesSection from "../components/KeyFeaturesSection";

export default function Home() {
  return (
    <div className="mt-10">
      <AnimatedHeroSection />
      <HowItWorksSection />
      <SALMAUniqueSection />
      <KeyFeaturesSection />
    </div>
  );
}
