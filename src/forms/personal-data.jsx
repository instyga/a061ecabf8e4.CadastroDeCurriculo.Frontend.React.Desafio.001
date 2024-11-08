import { Grid, TextInput, Radio, Group, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import MaskedInput from "react-text-mask";
import { FormSectionTitle } from "../components/form-section-title";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

const schema = z.object({
  fullName: z.string().min(1, "Campo obrigatório"),
  gender: z.enum(["male", "female", "other"], { required_error: "Campo obrigatório" }),
  nacionality: z.enum(["Brasileiro(a)", "Estrangeiro(a)"], { required_error: "Campo obrigatório" }),
  placeBirth: z.string().min(1, "Campo obrigatório"),
  birthday: z.preprocess((input) => new Date(input), z.date().refine((date) => {
      return !isNaN(date.getTime()) && date < new Date();
    }, {
      message: "Data inválida ou posterior a hoje.",
    })
  ),
  email: z.string().email("E-mail inválido"),
  telephone: z.coerce.string().min(14, "Número inválido"),
  cellPhone: z.coerce.string().min(15, "Número inválido"),
  website: z.string().optional(),
  linkedIn: z.string().optional(),
  gitHub: z.string().optional(),
});

export const FormPersonalData = ({ onValidation }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const debouncedValidation = useCallback(
    debounce((isValid) => {
      onValidation(isValid);
    }, 300),
    [onValidation]
  );

  const formValues = useWatch({ control });

  useEffect(() => {
    debouncedValidation(isValid);
  }, [formValues, isValid, debouncedValidation]);

  const onSubmit = (data) => {
  
  };

  const showError = (field) => errors[field]?.message;

  return (
    <div>
      <FormSectionTitle 
        step={1} 
        title="Dados Pessoais" 
        caption="Informações Pessoais de contato"
        titleOrder={3}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <TextInput
              withAsterisk
              label="Nome Completo"
              placeholder="Digite seu nome completo"
              {...register("fullName")}
              error={showError("fullName")}
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
                  error={showError("gender")}
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
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={showError("nacionality")}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 3 }}>
            <TextInput
              withAsterisk
              label="Naturalidade"
              {...register("placeBirth")}
              error={showError("placeBirth")}
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
                  error={showError("birthday")}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <TextInput
              label="E-mail"
              placeholder="email@email.com"
              {...register("email")}
              error={showError("email")}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 3 }}>
            <Controller
              control={control}
              name="telephone"
              render={({ field }) => (
                <TextInput
                  withAsterisk
                  label="Telefone"
                  component={MaskedInput}
                  mask={[
                    "(",
                    /[0-9]/,
                    /[0-9]/,
                    ")",
                    " ",
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                    "-",
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                  ]}
                  placeholder="(99) 9999-9999"
                  {...field}
                  error={showError("telephone")}
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
                  withAsterisk
                  label="Celular / Whatsapp"
                  component={MaskedInput}
                  mask={[
                    "(",
                    /[0-9]/,
                    /[0-9]/,
                    ")",
                    " ",
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                    "-",
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                  ]}
                  placeholder="(99) 99999-9999"
                  {...field}
                  error={showError("cellPhone")}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 4 }}>
            <TextInput
              label="Website / Portfólio"
              {...register("website")}
              error={showError("website")}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 4 }}>
            <TextInput
              label="LinkedIn"
              {...register("linkedIn")}
              error={showError("linkedIn")}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 4 }}>
            <TextInput
              label="GitHub"
              {...register("gitHub")}
              error={showError("gitHub")}
            />
          </Grid.Col>
        </Grid>
      </form>
    </div>
  );
};

