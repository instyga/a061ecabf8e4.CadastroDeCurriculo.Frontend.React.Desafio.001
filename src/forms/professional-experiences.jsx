import {
  Button,
  Checkbox,
  Fieldset,
  Grid,
  Textarea,
  TextInput,
} from "@mantine/core";
import { FormSectionTitle } from "../components/form-section-title";
import { DateInput } from "@mantine/dates";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";


const baseSchema = z.object({
  companyName: z.string().min(1, "Campo obrigatório"),
  jobTitle: z.string().min(1, "Campo obrigatório"),
  startDate: z.coerce.date().refine((date) => date <= new Date(), {
    message: "Data inválida",
  }),
  endDate: z.coerce.date().optional(),
  description: z.string().min(10, "Campo obrigatório"),
  isCurrentJob: z.boolean().optional(),
});


const schema = baseSchema.refine((data) => {
  if (data.endDate && data.startDate) {
    return data.endDate >= data.startDate;
  }
  return true;
}, {
  path: ["endDate"],
  message: "Data inválida",
});


export function FormProfessionalExperiences({ onAddExperience }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      isCurrentJob: false,
    },
  });

  const isCurrentJob = watch("isCurrentJob");

 
  const onSubmitHandler = (data) => {
    const experience = {
      ...data,
      id: uuidv4(),
      startDate: data.startDate.toISOString(),
      endDate: isCurrentJob ? "Presente" : data.endDate?.toISOString(),
    };

    console.log('Dados da experiência a serem adicionados:', experience);

   
    if (onAddExperience) {
      onAddExperience(experience);
    }
    reset(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Fieldset
        legend={
          <FormSectionTitle
            step={2}
            title="Experiência profissional"
            caption="Lista de experiências profissionais"
            titleOrder={3}
          />
        }
      >
        <Grid>
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <TextInput
              label="Empresa"
              withAsterisk
              {...register("companyName")}
              error={errors.companyName?.message}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <TextInput
              label="Cargo"
              withAsterisk
              {...register("jobTitle")}
              error={errors.jobTitle?.message}
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
                  label="Data de início"
                  {...field}
                  error={errors.startDate?.message}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 3 }}>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DateInput
                  valueFormat="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  label="Data de saída"
                  {...field}
                  error={errors.endDate?.message}
                  disabled={isCurrentJob}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 6 }} align="flex-end">
            <Checkbox
              {...register("isCurrentJob")}
              label="Ainda trabalho nesta empresa"
              onChange={(e) => {
                const { checked } = e.target;
                register("isCurrentJob").onChange(e);
                if (checked) {
                  reset({ ...watch(), endDate: undefined });
                }
              }}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 12 }}>
            <Textarea
              withAsterisk
              label="Descrição das atividades"
              description="Dica: fale sobre as atividades que você exerceu e que trouxeram impactos positivos para a empresa"
              {...register("description")}
              error={errors.description?.message}
            />
          </Grid.Col>
        </Grid>
        <Button type="submit" disabled={!isValid}>Adicionar Experiência</Button>
      </Fieldset>
      {Object.keys(errors).length > 0 && (
        <div style={{ color: "red", marginTop: "10px" }}>
          Preencha todos os campos obrigatórios corretamente antes de adicionar a experiência.
        </div>
      )}
    </form>
  );
}
