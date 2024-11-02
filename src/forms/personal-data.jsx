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

export const FormPersonalData = ({ onValidation }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    const isValid = !Object.keys(errors).length;
    onValidation(isValid);
  }, [errors, onValidation]);

  const handleFocus = async (fieldName) => {
    await trigger(fieldName);
  };

  const onSubmit = (data) => {
    console.log("Dados pessoais:", data);
  };

  return (
    <div>
      <FormSectionTitle step={1} title="Dados Pessoais" caption="Informações Pessoais de contato" />
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  data={["Brasileiro(a)", "Estrangeiro(a)"]}
                  withAsterisk
                  label="Nacionalidade"
                  placeholder="Selecione sua nacionalidade"
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    trigger("nacionality");
                  }}
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
                  onChange={(value) => {
                    field.onChange(value);
                    trigger("birthday");
                  }}
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
};
