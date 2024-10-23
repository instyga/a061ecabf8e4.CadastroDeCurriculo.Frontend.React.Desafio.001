// import { Button, Container, Group } from "@mantine/core";
// import { openConfirmSaveModal } from "../helpers/open-confirm-save-modal";

// export const AppFooter = () => {
//   return (
//     <Container size="lg">
//       <Group my="lg" position="right">
//         <Button variant="light" onClick={() => {}}>
//           Voltar
//         </Button>{" "}
//         <Button onClick={() => {}}>Próximo</Button>
//         <Button
//           color="teal"
//           onClick={() =>
//             openConfirmSaveModal(() => alert("Dados enviados com sucesso!"))
//           }
//         >
//           Salvar dados
//         </Button>
//       </Group>
//     </Container>
//   );
// };


import { Button, Container, Group } from "@mantine/core";
import { openConfirmSaveModal } from "../helpers/open-confirm-save-modal";

export const AppFooter = ({onNext, onBack} ) => {
  console.log(typeof onNext);
  console.log(typeof onBack);
  return (
    <Container size="lg">
      <Group my="lg" position="right">
        <Button variant="light" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={onNext}>Próximo</Button>
        <Button
          color="teal"
          onClick={() =>
            openConfirmSaveModal(() => alert("Dados enviados com sucesso!"))
          }
        >
          Salvar dados
        </Button>
      </Group>
    </Container>
  );
};

