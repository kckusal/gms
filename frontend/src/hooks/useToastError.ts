import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export const useToastError = () => {
  const toast = useToast();

  const toaster = useCallback(
    (title: string, description = "", id = "") => {
      toast({
        id,
        title,
        description,
        duration: 8000,
        isClosable: true,
        position: "bottom-right",
        status: "error",
      });
    },
    [toast],
  );

  return toaster;
};
