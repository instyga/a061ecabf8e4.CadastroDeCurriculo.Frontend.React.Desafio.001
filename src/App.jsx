import { AppShell } from "@mantine/core";
import { AppFooter } from "./components/app-footer";
import { AppHeader } from "./components/app-header";
import { useState } from "react";
import Home from "./pages/home";

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isNextStepAllowed, setIsNextStepAllowed] = useState(false);
  const [professionalExperiences, setProfessionalExperiences] = useState([]);
  const totalSteps = 3;

  const handleNext = () => {
    if (isNextStepAllowed) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1)); 
      setIsNextStepAllowed(false); 
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleExperienceAdded = (experience) => {
    setProfessionalExperiences((prev) => [...prev, experience]);
    setIsNextStepAllowed(true); 
  };

  return (
    <AppShell header={{ height: 60 }} footer={{ height: 80 }} padding="md" bg="gray.0">
      <AppShell.Header bg="blue">
        <AppHeader />
      </AppShell.Header>
      <AppShell.Main>
        <Home
          currentStep={currentStep}
          onExperienceAdded={handleExperienceAdded}
          professionalExperiences={professionalExperiences}
          setIsNextStepAllowed={setIsNextStepAllowed} 
        />
      </AppShell.Main>
      <AppShell.Footer>
        <AppFooter
          onNext={handleNext}
          onBack={handlePrev}
          isNextStepAllowed={isNextStepAllowed}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      </AppShell.Footer>
    </AppShell>
  );
};

export default App;
