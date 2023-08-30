import { Input, InputProps } from "@chakra-ui/react";
import { FC } from "react";

export const DatePicker: FC<InputProps> = (props) => {
  return <Input type="datetime-local"  {...props} />;
};
