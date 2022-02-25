import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Textarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label?: string;
  isRequired?: boolean;
  defaultValue?: string;
  size?: "xs" | "sm" | "md" | "lg";
  [rest: string]: string
  | number
  | boolean
  | undefined
};

export function TextField({
  label,
  name,
  isRequired = true,
  defaultValue = '',
  size = "sm",
  ...rest
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl id={name} flex={1} isRequired={isRequired} isInvalid={!!errors?.[name]?.message}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Textarea
        variant='outline'
        size={size}
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
