import { Container } from "@mantine/core";
import { ExperimentalFormAlert } from "../components/experimental-form-alert";
import { FormPersonalData } from "../forms/personal-data";
import { FormProfessionalExperiences } from "../forms/professional-experiences";
import { ScholarshipList } from "../forms/scholarship-list";


const steps = [FormPersonalData, FormProfessionalExperiences, ScholarshipList];

const Home = ({ currentStep, onExperienceAdded, professionalExperiences, setIsNextStepAllowed }) => {
  const CurrentStepComponent = steps[currentStep];

  return (
    <Container>
      <ExperimentalFormAlert />
      <CurrentStepComponent 
        onValidation={setIsNextStepAllowed} 
        onExperienceAdded={onExperienceAdded} 
        professionalExperiences={professionalExperiences} 
      />
    </Container>
  );
};

export default Home;


