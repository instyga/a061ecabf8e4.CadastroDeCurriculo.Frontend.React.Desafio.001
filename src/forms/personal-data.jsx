import { Grid, TextInput, Radio, Group, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import MaskedInput from "react-text-mask";
import { FormSectionTitle } from "../components/form-section-title";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

const schema = z.object({
  fullName: z.string().min(1, "Campo obrigatório"),
  gender: z.enum(["male", "female", "other"], { required_error: "Campo obrigatório" }),
  nacionality: z.string().min(1, "Campo obrigatório"),
  placeBirth: z.string().min(1, "Campo obrigatório"),
  birthday: z.date()
    .refine(date => !isNaN(date.getTime()), {
      message: "Data inválida",
    })
    .refine(date => date < new Date(), {
      message: "A data de nascimento deve ser anterior a hoje.",
    }),
  email: z.string().email("E-mail inválido"),
  telephone: z.string().min(1, "Número invalido"),
  cellPhone: z.string().min(1, "Número invealido"),
  website: z.string().optional(),
  linkedIn: z.string().optional(),
  gitHub: z.string().optional(),
});

export const FormPersonalData = ({ onValidation }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, touchedFields },
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  useEffect(() => {
    onValidation(isValid); 
  }, [isValid, onValidation]);

  const handleChange = async () => {
    await trigger();
  };

  const onSubmit = (data) => {
    console.log("Dados pessoais:", data);
  };

  const showError = (field) => touchedFields[field] && errors[field]?.message;

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
              {...register("fullName", { onChange: handleChange })}
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
                  onChange={(value) => {
                    field.onChange(value);
                    handleChange();
                  }}
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
                  onChange={(value) => {
                    field.onChange(value);
                    handleChange();
                  }}
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
              {...register("placeBirth", { onChange: handleChange })}
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
                  onChange={(value) => {
                    field.onChange(value);
                    handleChange();
                  }}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <TextInput
              label="E-mail"
              placeholder="email@email.com"
              {...register("email", { onChange: handleChange })}
              error={showError("email")}
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
              {...register("website", { onChange: handleChange })}
              error={showError("website")}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 4 }}>
            <TextInput
              label="LinkedIn"
              {...register("linkedIn", { onChange: handleChange })}
              error={showError("linkedIn")}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 4 }}>
            <TextInput
              label="GitHub"
              {...register("gitHub", { onChange: handleChange })}
              error={showError("gitHub")}
            />
          </Grid.Col>
        </Grid>
      </form>
    </div>
  );
};
