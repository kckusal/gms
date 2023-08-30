import { Heading, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";

export const Sidebar: FC = () => {
  const menuItems = [
    { label: "Home", route: "/" },
    {
      label: "Profile",
      route: "/profile",
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
        py={4}
        px={4}
        borderRight="1px solid #ddd">
        <Heading as="h4" size="sm" mb={4}>
          My dashboard
        </Heading>

        <VStack height="full">
          {menuItems.map((menuItem) => (
            <NavLink
              key={menuItem.route}
              to={menuItem.route}
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "black",
                };
              }}>
              {menuItem.label}
            </NavLink>
          ))}
        </VStack>

        <NavLink to="/auth/signout">Sign out</NavLink>
      </VStack>
    </RequireAuth>
  );
};
