import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { NavLink } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import { AuthContext } from "../providers/AuthProvider";
import { SecurityRole } from "../types";

export const Sidebar: FC = () => {
  const authData = useContext(AuthContext);

  const menuItems: Array<{
    label: string;
    route: string;
    authorizedRoles: Array<SecurityRole>;
  }> = [
    {
      label: "My Profile",
      route: "/my-profile",
      authorizedRoles: ["ADMIN", "MEMBER", "TRAINER"],
    },
    {
      label: "Users",
      route: "/users",
      authorizedRoles: ["ADMIN", "TRAINER"],
    },
    {
      label: "Training sessions",
      route: "/training-sessions",
      authorizedRoles: ["ADMIN", "TRAINER", "MEMBER"],
    },
  ];

  return (
    <RequireAuth>
      <VStack
        bg="whiteAlpha.700"
        width={220}
        position="sticky"
        top={60}
        height="full"
        justify="space-between"
        align="stretch"
        py={4}
        borderRight="1px solid #ddd">
        <Heading as="span" size="sm" textTransform="capitalize" mb={6} pl={4}>
          {authData.data?.user?.role.toLowerCase()} Dashboard
        </Heading>

        <VStack height="full" spacing={0}>
          <Text fontSize="sm" color="gray.500" width="full" pl={4} mb={2}>
            Manage
          </Text>

          {menuItems.map((menuItem) => {
            if (
              !authData.data?.user?.role ||
              !menuItem.authorizedRoles.includes(authData.data?.user?.role)
            ) {
              return null;
            }

            return (
              <NavLink
                key={menuItem.route}
                to={menuItem.route}
                style={({ isActive }) => {
                  return {
                    width: "100%",
                    borderRight: isActive ? "4px solid blue" : "inherit",
                    background: isActive ? "linen" : "inherit",
                    fontWeight: isActive ? 600 : 400,
                  };
                }}>
                <Flex
                  width="full"
                  align="center"
                  px={6}
                  height="45px"
                  fontSize={14}
                  _hover={{
                    opacity: 0.8,
                    fontWeight: 600,
                    background: "whitesmoke",
                  }}>
                  {menuItem.label}
                </Flex>
              </NavLink>
            );
          })}
        </VStack>

        <Box as={NavLink} to="/auth/signout" pl={16}>
          Sign out
        </Box>
      </VStack>
    </RequireAuth>
  );
};
