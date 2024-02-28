import { Control } from "react-hook-form";

import { Input, InputProps } from "../ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "../ui/form";

type Props = {
  name: string;
  label?: string;
  control: Control<any>;
} & InputProps;

export function InputField({ name, label, control, ...rest }: Props) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {!!label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} {...rest} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
