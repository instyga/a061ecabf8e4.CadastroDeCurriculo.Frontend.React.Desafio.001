import { Container } from "@mantine/core";
import { ExperimentalFormAlert } from "../components/experimental-form-alert";
import { FormPersonalData } from "../forms/personal-data";
import { FormProfessionalExperiences } from "../forms/professional-experiences";
import { FormScholarshipDetails } from "../forms/scholarship-details";
import { ProfessionalExperiencesList } from "../forms/professional-experiences-list";
import { ScholarshipList } from "../forms/scholarship-list";

const steps=[
  {component:FormPersonalData, 
    label:"Dados Pessoais"},
  {
    component: ()=>(
      <>
      <FormProfessionalExperiences />
      <ProfessionalExperiencesList experiences={[]} />
      </>
    ),
    label:"Experiencia Profissional",
  },
  {
    component:()=>(
      <>
      <FormScholarshipDetails />
      <ScholarshipList scholarships={[]} />
      </>
    ),
    label:"Escolaridade",
  }
]

export const Home = ({currentStep}) => {

  const CurrentComponent = steps[currentStep]?.component;

  return (
    <Container size="lg">
      <ExperimentalFormAlert />
        {CurrentComponent ? <CurrentComponent /> : <div>Erro ao carregar o formulário</div>}
    
     
    </Container>
  );
};
