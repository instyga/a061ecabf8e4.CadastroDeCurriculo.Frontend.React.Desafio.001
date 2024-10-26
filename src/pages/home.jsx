import { Container } from "@mantine/core";
import { ExperimentalFormAlert } from "../components/experimental-form-alert";
import { FormPersonalData } from "../forms/personal-data";
import { FormProfessionalExperiences } from "../forms/professional-experiences";
import { ProfessionalExperiencesList } from "../forms/professional-experiences-list";
import { ScholarshipList } from "../forms/scholarship-list";

export const Home = ({ currentStep, onSubmit }) => {
  const steps = [
    {
      component: FormPersonalData,
      label: "Dados Pessoais",
    },
    {
      component: () => (
        <>
          <FormProfessionalExperiences onSubmit={onSubmit} />
          <ProfessionalExperiencesList experiences={[]} />
        </>
      ),
      label: "Experiência Profissional",
    },
    {
      component: () => (
        <>
          <ScholarshipList scholarships={[]} />
        </>
      ),
      label: "Escolaridade",
    },
  ];

  const CurrentComponent = steps[currentStep]?.component;



  return (
    <Container size="lg">
      <ExperimentalFormAlert />
      {CurrentComponent ? (
        <CurrentComponent onSubmit={(data) => onSubmit(data.isValid)} />
      ) : (
        <div>Erro ao carregar o formulário</div>
      )}
    </Container>
  );
};
