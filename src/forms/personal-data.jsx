import { Grid, TextInput, Radio, Group, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import MaskedInput from "react-text-mask";
import { FormSectionTitle } from "../components/form-section-title";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

const schema = z.object({
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  gender: z.enum(["male", "female", "other"], { required_error: "Gênero é obrigatório" }),
  nacionality: z.string().min(1, "Nacionalidade é obrigatória"),
  placeBirth: z.string().min(1, "Naturalidade é obrigatória"),
  birthday: z.date()
    .refine(date => !isNaN(date.getTime()), {
      message: "Data de nascimento é obrigatória",
    })
    .refine(date => date < new Date(), {
      message: "A data de nascimento deve ser anterior a hoje.",
    }),
  email: z.string().email("Formato de e-mail inválido"),
  telephone: z.string().min(1, "Telefone é obrigatório"),
  cellPhone: z.string().min(1, "Celular é obrigatório"),
  website: z.string().optional(),
  linkedIn: z.string().optional(),
  gitHub: z.string().optional(),
});

export function FormPersonalData({ onSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    trigger, 
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur", 
  });

  useEffect(() => {
    onSubmit({ isValid });
  }, [isValid, onSubmit]);


  const handleFocus = async (fieldName) => {
    await trigger(fieldName); 
  };

  return (
    <div>
      <FormSectionTitle step={1} title="Dados Pessoais" caption="Informações Pessoais de contato" />
      <form
        onSubmit={handleSubmit((data) => {
          console.log("Dados do formulário enviados:", data);
          onSubmit({ data, isValid });
        })}
      >
        <Grid>
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <TextInput
              withAsterisk
              label="Nome Completo"
              placeholder="Digite seu nome completo"
              {...register("fullName")}
              error={errors.fullName?.message} 
              onFocus={() => handleFocus("fullName")} 
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Radio.Group
                  withAsterisk
                  label="Gênero"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.gender?.message} 
                >
                  <Group my="xs">
                    <Radio value="male" label="Masculino" />
                    <Radio value="female" label="Feminino" />
                    <Radio value="other" label="Outro" />
                  </Group>
                </Radio.Group>
              )}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 3 }}>
            <Controller
              name="nacionality"
              control={control}
              render={({ field }) => (
                <Select
                  data={["Brasileiro", "Estrangeiro"]}
                  withAsterisk
                  label="Nacionalidade"
                  placeholder="Selecione sua nacionalidade"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.nacionality?.message} 
                  onFocus={() => handleFocus("nacionality")} 
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 3 }}>
            <TextInput
              withAsterisk
              label="Naturalidade"
              {...register('placeBirth')}
              error={errors.placeBirth?.message} 
              onFocus={() => handleFocus("placeBirth")} 
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 3 }}>
            <Controller
              control={control}
              name="birthday"
              render={({ field }) => (
                <DateInput
                  withAsterisk
                  valueFormat="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  label="Data de Nascimento"
                  {...field}
                  error={errors.birthday?.message} 
                  onFocus={() => handleFocus("birthday")} 
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <TextInput
              label="E-mail"
              placeholder="email@email.com"
              {...register('email')}
              error={errors.email?.message} 
              onFocus={() => handleFocus("email")} 
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 3 }}>
            <Controller
              control={control}
              name="telephone"
              render={({ field }) => (
                <TextInput
                  label="Telefone"
                  component={MaskedInput}
                  mask={['(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                  placeholder="(99) 9999-9999"
                  {...field}
                  error={errors.telephone?.message} 
                  onFocus={() => handleFocus("telephone")} 
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 3 }}>
            <Controller
              control={control}
              name="cellPhone"
              render={({ field }) => (
                <TextInput
                  label="Celular / Whatsapp"
                  component={MaskedInput}
                  mask={['(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                  placeholder="(99) 99999-9999"
                  {...field}
                  error={errors.cellPhone?.message} 
                  onFocus={() => handleFocus("cellPhone")} 
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 4 }}>
            <TextInput
              label="Website / Portifólio"
              {...register('website')}
              error={errors.website?.message} 
              onFocus={() => handleFocus("website")} 
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 4 }}>
            <TextInput
              label="LinkedIn"
              {...register('linkedIn')}
              error={errors.linkedIn?.message} 
              onFocus={() => handleFocus("linkedIn")} 
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 4 }}>
            <TextInput
              label="GitHub"
              {...register('gitHub')}
              error={errors.gitHub?.message} 
              onFocus={() => handleFocus("gitHub")} 
            />
          </Grid.Col>
        </Grid>
      </form>
    </div>
  );
}
