import { AppShell } from "@mantine/core";
import { AppFooter } from "./components/app-footer";
import { AppHeader } from "./components/app-header";
import { useState, useEffect } from "react";
import Home from "./pages/home";

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isNextStepAllowed, setIsNextStepAllowed] = useState(false);
  const [professionalExperiences, setProfessionalExperiences] = useState([]);
  const [personalData, setPersonalData] = useState({});
  const [scholarships, setScholarships] = useState([]);

  const totalSteps = 3;

  
  const saveToLocalStorage = () => {
    const formData = {
      currentStep,
      personalData,
      professionalExperiences,
      scholarships,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  };


  useEffect(() => {
    saveToLocalStorage();
  }, [currentStep, personalData, professionalExperiences, scholarships]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setCurrentStep(savedData.currentStep || 0);
      setPersonalData(savedData.personalData || {});
      setProfessionalExperiences(savedData.professionalExperiences || []);
      setScholarships(savedData.scholarships || []);
    }
  }, []);

  const handleNext = () => {
    if (isNextStepAllowed) {
      setCurrentStep((prev) => {
        const nextStep = Math.min(prev + 1, totalSteps - 1);
        return nextStep;
      });
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

  const handlePersonalData = (data) => {
    setPersonalData(data);
  };

  const handleScholarshipAdded = (scholarship) => {
    setScholarships((prev) => [...prev, scholarship]);
    setIsNextStepAllowed(true);
  };

  const handleSubmit = () => {
    const formData = {
      personalData,
      professionalExperiences,
      scholarships,
    };
    console.log("Objeto final ao salvar dados:", formData); 
  };

  return (
    <AppShell header={{ height: 60 }} footer={{ height: 80 }} padding="md" bg="gray.0">
      <AppShell.Header bg="blue">
        <AppHeader />
      </AppShell.Header>
      <AppShell.Main>
        <Home
          currentStep={currentStep}
          setIsNextStepAllowed={setIsNextStepAllowed}
          onExperienceAdded={handleExperienceAdded}
          onPersonalData={handlePersonalData}
          onScholarshipAdded={handleScholarshipAdded}
          professionalExperiences={professionalExperiences}
          scholarships={scholarships}
        />
      </AppShell.Main>
      <AppShell.Footer>
        <AppFooter
          onNext={handleNext}
          onBack={handlePrev}
          isNextStepAllowed={isNextStepAllowed}
          currentStep={currentStep}
          totalSteps={totalSteps}
          onSubmit={handleSubmit} 
        />
      </AppShell.Footer>
    </AppShell>
  );
};

export default App;
