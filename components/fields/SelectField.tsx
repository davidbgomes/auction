import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { useFormContext } from "react-hook-form";

export type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  isRequired?: boolean;
  defaultValue?: string;
  [rest: string]: string | number | boolean | SelectOption[] | undefined;
};

export default function SelectField({
  label,
  name,
  options,
  placeholder,
  isRequired = false,
  defaultValue = "",
  ...rest
}: Props): JSX.Element {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl id={name} flex={1} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Select
        variant="flushed"
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(`${name}`)}
        {...rest}
      >
        {options.map(({ label, value }) => {
          return (
            <option value={value} key={`${label}-${value}`}>
              {label}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
}
