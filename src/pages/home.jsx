import { Container } from "@mantine/core";
import { ExperimentalFormAlert } from "../components/experimental-form-alert";
import { FormPersonalData } from "../forms/personal-data";
import { FormProfessionalExperiences } from "../forms/professional-experiences";
import { useState } from "react";
import { ProfessionalExperiencesList } from "../forms/professional-experiences-list";
// import { ScholarshipList } from "../forms/scholarship-list"; // Verifique se este componente está corretamente importado
// import { ScholarshipDetails } from "../forms/scholarship-details"; // Ajuste o caminho conforme necessário

const Home = ({ currentStep, setIsNextStepAllowed }) => {
  const [experiences, setExperiences] = useState([]);

  const handleAddExperience = (experience) => {
    setExperiences((prev) => [...prev, experience]);
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
      {/* {currentStep === 2 && (
        <>
          <ScholarshipList />
          <ScholarshipDetails />
        </>
      )} */}
    </Container>
  );
};

export default Home;

