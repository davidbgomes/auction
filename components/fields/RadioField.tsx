import {
  FormControl,
  FormLabel,
} from '@chakra-ui/form-control';
import { Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Controller, useFormContext } from 'react-hook-form';

export type RadioOption = {
  label: string;
  value: string;
  [rest: string]: string | number | boolean;
};

type Props = {
  label: string;
  name: string;
  options: RadioOption[];
  direction?: 'row' | 'column';
  isRequired?: boolean;
  defaultValue?: string;
  [rest: string]: string | number | boolean | RadioOption[] | undefined;
};

export default function RadioField({
  label,
  name,
  options,
  direction = 'row',
  isRequired = false,
  defaultValue = '',
  ...rest
}: Props): JSX.Element {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl
      as="fieldset"
      flex={1}
      isRequired={isRequired}
    >
      <FormLabel as="legend">{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field, fieldState: { invalid } }) => (
          <RadioGroup {...field} {...rest} >
            <Stack direction={direction}>
              {options.map(({ label, value, ...rest }) => (
                <Radio value={value} key={value} isInvalid={invalid} {...rest}>
                  {label}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        )}
      />
    </FormControl>
  );
}