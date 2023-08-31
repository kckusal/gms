import { Input, InputProps } from "@chakra-ui/react";
import { FC } from "react";

export const TimePicker: FC<InputProps & { defaultValue?: string | null }> = ({
  defaultValue,
  ...props
}) => {
  return (
    <Input type="time" {...props} defaultValue={defaultValue ?? undefined} />
  );
};
