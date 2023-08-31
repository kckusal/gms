import { Input, InputProps } from "@chakra-ui/react";
import { FC } from "react";

export const DatePicker: FC<InputProps & { defaultValue?: string | null }> = ({
  defaultValue,
  ...props
}) => {
  return (
    <Input type="date" {...props} defaultValue={defaultValue ?? undefined} />
  );
};
