import { Button, Container, Group } from "@mantine/core";
import { openConfirmSaveModal } from "../helpers/open-confirm-save-modal";

export const AppFooter = ({ onNext, onBack, isNextStepAllowed, currentStep, totalSteps, onSubmit }) => {
  return (
    <Container size="lg">
      <Group my="lg" position="right">
        {currentStep > 0 && (
          <Button variant="light" onClick={onBack}>
            Voltar
          </Button>
        )}
        {currentStep === totalSteps - 1 ? (
          <Button
            color="teal"
            onClick={() =>
              openConfirmSaveModal(() => {
                alert("Dados enviados com sucesso!");
                onSubmit(); 
              })
            }
            disabled={!isNextStepAllowed}
          >
            Salvar dados
          </Button>
        ) : (
          <Button onClick={onNext} disabled={!isNextStepAllowed}>
            Próximo
          </Button>
        )}
      </Group>
    </Container>
  );
};
