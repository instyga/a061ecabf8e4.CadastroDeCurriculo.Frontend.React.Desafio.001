import { Grid, TextInput, Button, Fieldset } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSectionTitle } from "../components/form-section-title";
import { DateInput } from "@mantine/dates";

const schema = z.object({
  courseName: z.string().min(1, "Campo obrigatórioN"),
  institution: z.string().min(1, "Campo brigatório"),
  startDate: z.coerce.date().refine((date) => date <= new Date(), {
    message: "A data de início deve ser anterior à data atual",
  }),
  endDate: z.coerce.date().optional(),
  description: z.string().min(10, "Campo obrigatório"),
});

export function FormScholarshipDetails({ onAddScholarship }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmitHandler = (data) => {
    const scholarship = {
      ...data,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate ? data.endDate.toISOString() : null,
    };
    onAddScholarship(scholarship);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Fieldset
        legend={
          <FormSectionTitle
            step={3}
            title="Detalhes da Bolsa"
            caption="Informações sobre suas bolsas de estudo"
          />
        }
      >
        <Grid>
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <TextInput
              label="Nome do Curso"
              withAsterisk
              {...register("courseName")}
              error={errors.courseName?.message}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <TextInput
              label="Instituição"
              withAsterisk
              {...register("institution")}
              error={errors.institution?.message}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 3 }}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DateInput
                  withAsterisk
                  valueFormat="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  label="Data de Início"
                  {...field}
                  error={errors.startDate?.message}
                />
              )}
            />
          </Grid.Col>
          {/* <Grid.Col span={{ xs: 12, md: 6 }} align="flex-end">
//             <Checkbox.Group label="Situação">
//               <Group my="xs">
//                 <Checkbox value="actual" label="Ainda estou cursando" />
//               </Group>
//             </Checkbox.Group>
//           </Grid.Col> */}
          {/* <Grid.Col span={{ xs: 12, md: 6 }} align="flex-end">
            <Checkbox
              {...register("actual")}
              label="Ainda estou cursando"
              onChange={(e) => {
                register("isActual").onChange(e); 
                if (e.target.checked) {
                  reset({ ...watch(), endDate: undefined }); 
                }
              }}
            />
          </Grid.Col> */}
          <Grid.Col span={{ xs: 12, md: 3 }}>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DateInput
                  valueFormat="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  label="Data de Saída"
                  {...field}
                  error={errors.endDate?.message}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 12 }}>
            <TextInput
              withAsterisk
              label="Descrição"
              {...register("description")}
              error={errors.description?.message}
            />
          </Grid.Col>
        </Grid>
        <Button type="submit" disabled={!isValid}>Adicionar Bolsa</Button>
      </Fieldset>
    </form>
  );
}
