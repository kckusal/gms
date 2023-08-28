import { Box, HStack } from "@chakra-ui/react";
import { FC } from "react";

const Header: FC = () => {
  return (
    <HStack
      backgroundColor="facebook.800"
      color="gray.100"
      height="60px"
      px={6}
      position="sticky"
      top="0"
      fontWeight="extrabold"
      zIndex={9999}
      boxShadow="sm"
    >
      <Box fontSize={[15, 18, 20]} mx="auto">Gym Management System</Box>
    </HStack>
  );
};

export default Header;
