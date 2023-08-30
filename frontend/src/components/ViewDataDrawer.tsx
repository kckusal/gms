import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface Props {
  title: string;
  fields: Array<{ label: string; content: ReactNode }>;
  onClose: () => void;
}

export const ViewDataDrawer: FC<Props> = ({ title, fields, onClose }) => {
  return (
    <Drawer isOpen onClose={onClose}>
      <DrawerOverlay />

      <DrawerContent minW={400}>
        <DrawerCloseButton />

        <DrawerHeader alignItems="center">
          <Heading as="h2" size="lg">{title}</Heading>
        </DrawerHeader>

        <DrawerBody>
          <VStack align="flex-start" gap={6}>
            {fields.map((field) => (
              <VStack key={field.label} width="full" align="flex-start" gap={1}>
                <Box fontSize={16} color="gray.500">
                  {field.label}
                </Box>
                <Text fontSize={15} fontWeight={600}>
                  {field.content}
                </Text>
              </VStack>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
