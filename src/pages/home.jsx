import { Container } from "@mantine/core";
import { ExperimentalFormAlert } from "../components/experimental-form-alert";
import { FormPersonalData } from "../forms/personal-data";
import { FormProfessionalExperiences } from "../forms/professional-experiences";
import { useState } from "react";
import { ProfessionalExperiencesList } from "../forms/professional-experiences-list";
import { ScholarshipList } from "../forms/scholarship-list"; // Importando a lista de bolsas
import { FormScholarshipDetails } from "../forms/scholarship-details"; // Importando os detalhes da bolsa

const Home = ({ currentStep, setIsNextStepAllowed }) => {
  const [experiences, setExperiences] = useState([]);
  const [scholarships, setScholarships] = useState([]); // Estado para gerenciar bolsas

  const handleAddExperience = (experience) => {
    setExperiences((prev) => [...prev, experience]);
    setIsNextStepAllowed(true);
  };

  const handleAddScholarship = (scholarship) => {
    setScholarships((prev) => [...prev, scholarship]);
    setIsNextStepAllowed(true);
  };

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

      {/* Etapa 3: Lista de Bolsas e Detalhes da Bolsa */}
      {currentStep === 2 && (
        <>
          <FormScholarshipDetails onAddScholarship={handleAddScholarship} />
          <ScholarshipList scholarships={scholarships} />
        </>
      )}
    </Container>
  );
};

export default Home;
