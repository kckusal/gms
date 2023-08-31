import { UseToastOptions, useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const defaultToastConfig: UseToastOptions = {
  duration: 8000,
  isClosable: true,
  position: "bottom-right",
  status: "info",
};

export const useToastNotify = () => {
  const toast = useToast();

  const toastError = useCallback(
    (title: string, description = "", id = "") => {
      if (id && toast.isActive(id)) return;

      toast({
        ...defaultToastConfig,
        id,
        title,
        description,
        status: "error",
      });
    },
    [toast],
  );

  const toastSuccess = useCallback(
    (title: string, description = "", id = "") => {
      if (id && toast.isActive(id)) return;

      toast({
        ...defaultToastConfig,
        id,
        title,
        description,
        status: "success",
      });
    },
    [toast],
  );

  return {
    toastError,
    toastSuccess,
  };
};
