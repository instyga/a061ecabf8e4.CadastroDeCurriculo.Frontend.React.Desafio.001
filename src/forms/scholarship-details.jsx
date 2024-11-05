import { Grid, TextInput, Button, Fieldset, Checkbox } from "@mantine/core";
import { useForm, Controller} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSectionTitle } from "../components/form-section-title";
import { DateInput } from "@mantine/dates";
import { v4 as uuidv4 } from 'uuid';

const schema = z.object({
  courseName: z.string().min(1, "Campo obrigatório"),
  institution: z.string().min(1, "Campo obrigatório"),
  startDate: z.coerce.date().refine((date) => date <= new Date(), {
    message: "A data de início deve ser anterior à data atual",
  }),
  endDate: z.coerce.date().optional(),
  description: z.string().min(10, "Campo obrigatório"),
  isActual: z.boolean().optional(),
}).refine((data) => {
  if (data.endDate && data.startDate) {
    return data.endDate >= data.startDate;
  }
  return true;
}, {
  path: ["endDate"],
  message: "Data inválida",
});

export function FormScholarshipDetails({ onAddScholarship, onFormValidChange }) {
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
  });


  const onSubmitHandler = (data) => {
    const scholarship = {
      ...data,
      id: uuidv4(),
      startDate: data.startDate.toISOString(),
      endDate: data.isActual ? null : data.endDate ? data.endDate.toISOString() : null,
    };
    console.log("Submitting scholarship data:", scholarship);

    onAddScholarship(scholarship);
    reset(); 
    
    if (typeof onFormValidChange === "function") {
      onFormValidChange(isValid);
    } else {
      console.error("onFormValidChange não é uma função");
    }
  };

  const isCurrentlyEnrolled = watch("isActual");

  const descriptionFilled = watch("description")?.length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Fieldset
        legend={
          <FormSectionTitle
            step={3}
            title="Detalhes da Bolsa"
            caption="Informações sobre suas bolsas de estudo"
            titleOrder={3} 
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
          <Grid.Col span={{ xs: 12, md: 6 }} align="flex-end">
            <Checkbox
              {...register("isActual")}
              label="Ainda estou cursando"
              onChange={(e) => {
                const {checked} = e.target;
                register("isActual").onChange(e);
                
                if (checked) {
                  reset({ ...watch(), endDate: undefined }); 
                }
              }}
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
                  label="Data de Saída"
                  {...field}
                  error={errors.endDate?.message}
                  disabled={isCurrentlyEnrolled}  
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
      {Object.keys(errors).length > 0 && (
        <div style={{ color: "red", marginTop: "10px" }}>
          Preencha todos os campos obrigatórios corretamente antes de adicionar a bolsa.
        </div>
      )}
    </form>
  );
}
