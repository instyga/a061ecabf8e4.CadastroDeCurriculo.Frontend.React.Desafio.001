// import {
//   Button,
//   Checkbox,
//   Fieldset,
//   Grid,
//   Group,
//   TextInput,
// } from "@mantine/core";
// import { FormSectionTitle } from "../components/form-section-title";
// import { DateInput } from "@mantine/dates";

// export const FormScholarshipDetails = () => {
//   return (
//     <>
//       <Fieldset
//         legend={
//           <FormSectionTitle
//             step={3}
//             title="Escolaridade"
//             caption="Lista de cursos e graduações"
//           />
//         }
//       >
//         <Grid>
//           <Grid.Col span={{ xs: 12, md: 6 }}>
//             <TextInput label="Instituição" />
//           </Grid.Col>
//           <Grid.Col span={{ xs: 12, md: 6 }}>
//             <TextInput label="Curso" />
//           </Grid.Col>
//           <Grid.Col span={{ xs: 12, md: 3 }}>
//             <DateInput placeholder="DD/MM/YYYY" label="Data de início" />
//           </Grid.Col>
//           <Grid.Col span={{ xs: 12, md: 3 }}>
//             <DateInput placeholder="DD/MM/YYYY" label="Data do término" />
//           </Grid.Col>
//           <Grid.Col span={{ xs: 12, md: 6 }} align="flex-end">
//             <Checkbox.Group label="Situação">
//               <Group my="xs">
//                 <Checkbox value="actual" label="Ainda estou cursando" />
//               </Group>
//             </Checkbox.Group>
//           </Grid.Col>
//           <Grid.Col span={{ xs: 12, md: 12 }}>
//             <Button variant="outline">Adicionar escolaridade</Button>
//           </Grid.Col>
//         </Grid>
//       </Fieldset>
//     </>
//   );
// };

import {
  Button,
  Checkbox,
  Fieldset,
  Grid,
  Group,
  TextInput,
} from "@mantine/core";
import { FormSectionTitle } from "../components/form-section-title";
import { DateInput } from "@mantine/dates";
import { useForm } from '@mantine/form';

export const FormScholarshipDetails = ({ onAddScholarship }) => {
  const form = useForm({
    initialValues: {
      schoolName: '',
      course: '',
      startDate: null,
      endDate: null,
      isStillStudying: false,
    },
  });

  const handleSubmit = (values) => {
    const scholarship = {
      id: Date.now(), // Gerando um ID único simples
      schoolName: values.schoolName,
      course: values.course,
      startDate: values.startDate,
      endDate: values.isStillStudying ? 'Ainda cursando' : values.endDate,
    };
    onAddScholarship(scholarship);
    form.reset(); // Limpa o formulário após a adição
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Fieldset
        legend={
          <FormSectionTitle
            step={3}
            title="Escolaridade"
            caption="Lista de cursos e graduações"
          />
        }
      >
        <Grid>
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <TextInput label="Instituição" {...form.getInputProps('schoolName')} />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <TextInput label="Curso" {...form.getInputProps('course')} />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 3 }}>
            <DateInput placeholder="DD/MM/YYYY" label="Data de início" {...form.getInputProps('startDate')} />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 3 }}>
            <DateInput placeholder="DD/MM/YYYY" label="Data do término" {...form.getInputProps('endDate')} />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 6 }} align="flex-end">
            <Checkbox
              label="Ainda estou cursando"
              {...form.getInputProps('isStillStudying', { type: 'checkbox' })}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 12 }}>
            <Button type="submit" variant="outline">Adicionar escolaridade</Button>
          </Grid.Col>
        </Grid>
      </Fieldset>
    </form>
  );
};
