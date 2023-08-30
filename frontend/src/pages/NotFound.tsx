import { Flex, HStack, Heading, Text } from "@chakra-ui/react";

export function NotFoundPage() {
  return (
    <Flex width="full" height="full" justify="center" align="center">
      <HStack align="center" gap={6}>
        <Heading as="h2" size="2xl">404</Heading>
        <Text>Page not found</Text>
      </HStack>
    </Flex>
  );
}
