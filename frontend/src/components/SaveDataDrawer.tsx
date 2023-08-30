import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface Props {
  isCreating?: boolean;
  isLoading?: boolean;
  title: string;
  fields: Array<{ label: string; render: ReactNode }>;
  onClose: () => void;
  onSubmit: (values: Record<string, unknown>) => void;
}

export const SaveDataDrawer: FC<Props> = ({
  isCreating = false,
  isLoading = false,
  title,
  fields,
  onClose,
  onSubmit,
}) => {
  return (
    <Drawer isOpen onClose={onClose}>
      <DrawerOverlay />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          onSubmit(Object.fromEntries(formData));
        }}>
        <DrawerContent minW={400}>
          <DrawerCloseButton />

          <DrawerHeader>
            <Heading as="h2" size="lg">
              {title}
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            <VStack align="flex-start" w="full" gap={4}>
              {fields.map((field) => (
                <VStack
                  key={field.label}
                  width="full"
                  align="flex-start"
                  gap={1}>
                  <Box fontSize={16} color="gray.500">
                    {field.label}
                  </Box>

                  <Box fontSize={13} fontWeight={600} w="full">
                    {field.render}
                  </Box>
                </VStack>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button type="submit" colorScheme="facebook" isLoading={isLoading}>
              {isCreating ? "Create" : "Save"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};
