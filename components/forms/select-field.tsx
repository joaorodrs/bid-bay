"use client";

import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";

type Option = {
  label?: string;
  value?: string;
};

type Props = {
  name: string;
  label?: string;
  control: Control<any>;
  options?: Option[];
};

export function SelectField({ name, label, control, options = [] }: Props) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {!!label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option, index) => (
                  <SelectItem
                    key={`${option.value}-${index}`}
                    value={option.value || ""}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
