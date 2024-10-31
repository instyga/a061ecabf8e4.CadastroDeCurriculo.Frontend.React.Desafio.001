import { Container, Button } from "@mantine/core";
import { ExperimentalFormAlert } from "../components/experimental-form-alert";
import { FormPersonalData } from "../forms/personal-data";
import { FormProfessionalExperiences } from "../forms/professional-experiences";
import { ProfessionalExperiencesList } from "../forms/professional-experiences-list";
import { ScholarshipList } from "../forms/scholarship-list";
import { useState } from "react";

export const Home = ({ currentStep, onSubmit }) => {
  const [professionalExperiences, setProfessionalExperiences] = useState([]);
  const [isExperienceFormValid, setIsExperienceFormValid] = useState(false);

  const handleAddExperience = (experience) => {
    setProfessionalExperiences((prev) => [...prev, experience]);
  };

  const handleExperienceFormValidation = (isValid) => {
    setIsExperienceFormValid(isValid);
  };


  const steps = [
    {
      component: FormPersonalData,
      label: "Dados Pessoais",
    },
    {
      component: () => (
        <>
          <FormProfessionalExperiences
           onAddExperience={handleAddExperience}
           onValidation={handleExperienceFormValidation}
           />
          <ProfessionalExperiencesList
           experiences={professionalExperiences} />
        </>
      ),
      label: "Experiência Profissional",
    },
    {
      component: () => <ScholarshipList scholarships={[]} />,
      label: "Escolaridade",
    },
  ];

  const CurrentComponent = steps[currentStep]?.component;

  const isNextStepAllowed = isExperienceFormValid && professionalExperiences.length > 0;

  return (
    <Container size="lg">
      <ExperimentalFormAlert />
      {CurrentComponent ? (
        <CurrentComponent />
      ) : (
        <div>Erro ao carregar o formulário</div>
      )}
      <Button onClick={() => onSubmit()} disabled={!isNextStepAllowed}>
        Próximo
      </Button>
    </Container>
  );
};
