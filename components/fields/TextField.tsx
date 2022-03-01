import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputProps } from "@chakra-ui/input";
import { Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  isRequired?: boolean;
  defaultValue?: string;
};

export function TextField({
  label,
  name,
  isRequired = true,
  defaultValue = "",
  ...rest
}: Props & InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl
      id={name}
      flex={1}
      isRequired={isRequired}
      isInvalid={!!errors?.[name]?.message}
    >
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Input
        variant="outline"
        size="md"
        borderColor="brand"
        borderRadius="4"
        defaultValue={defaultValue}
        {...register(name)}
        {...rest}
      />
      <FormErrorMessage>{errors?.[name]?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default TextField;
