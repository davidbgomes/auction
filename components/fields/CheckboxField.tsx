import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Stack } from "@chakra-ui/layout";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

export type CheckboxOption = {
  label: string;
  value: string;
  [rest: string]: string | number | boolean;
};

type Props = {
  label: string;
  name: string;
  options: CheckboxOption[];
  direction?: "row" | "column";
  isRequired?: boolean;
  defaultValue?: string[];
  [rest: string]:
    | string
    | number
    | boolean
    | CheckboxOption[]
    | undefined
    | string[];
};

export default function CheckboxField({
  label,
  name,
  options,
  direction = "column",
  isRequired = false,
  defaultValue = [],
  ...rest
}: Props): JSX.Element {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl as="fieldset" flex={1} isRequired={isRequired}>
      <FormLabel as="legend">{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field, fieldState: { invalid } }) => (
          <CheckboxGroup {...field} {...rest}>
            <Stack direction={direction} flexWrap="wrap">
              {options.map(({ label, value, ...rest }) => (
                <Checkbox
                  value={value}
                  key={value}
                  isInvalid={invalid}
                  {...rest}
                >
                  {label}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        )}
      />
    </FormControl>
  );
}
