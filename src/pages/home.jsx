import { Container } from "@mantine/core";
import { ExperimentalFormAlert } from "../components/experimental-form-alert";
import { FormPersonalData } from "../forms/personal-data";
import { FormProfessionalExperiences } from "../forms/professional-experiences";
import { useState } from "react";
import { ProfessionalExperiencesList } from "../forms/professional-experiences-list";
import { ScholarshipList } from "../forms/scholarship-list"; 
import { FormScholarshipDetails } from "../forms/scholarship-details"; 
import { useEffect } from 'react';

const Home = ({ currentStep, setIsNextStepAllowed }) => {
  const [experiences, setExperiences] = useState([]);
  const [scholarships, setScholarships] = useState([]);

  const handleAddExperience = (experience) => {
    setExperiences((prev) => [...prev, experience]);
    setIsNextStepAllowed(true);
  };

  const handleAddScholarship = (scholarship) => {
    setScholarships((prev) => [...prev, scholarship]);
    setIsNextStepAllowed(true);
  };

  useEffect(() => {
    console.log(`Current step: ${currentStep}`);
    if (currentStep === 0) {
      console.log('Form: Personal Data');
    } else if (currentStep === 1) {
      console.log('Form: Professional Experiences');
    } else if (currentStep === 2) {
      console.log('Form: Scholarship Details');
    }
  }, [currentStep]);

  return (
    <Container>
      <ExperimentalFormAlert />
      
      {currentStep === 0 && (
        <FormPersonalData onValidation={setIsNextStepAllowed} />
      )}
      
      {currentStep === 1 && (
        <>
          <FormProfessionalExperiences 
            onValidation={setIsNextStepAllowed} 
            onAddExperience={handleAddExperience} 
          />
          <ProfessionalExperiencesList experiences={experiences} />
        </>
      )}

      {currentStep === 2 && (
        <>
          <FormScholarshipDetails onAddScholarship={handleAddScholarship} onFormValidChange={setIsNextStepAllowed} />
          <ScholarshipList scholarships={scholarships} />
        </>
      )}
    </Container>
  );
};

export default Home;
