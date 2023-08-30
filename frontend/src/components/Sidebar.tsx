import { Heading, VStack } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { NavLink } from "react-router-dom";

export const Sidebar: FC = () => {
  const { isSignedIn } = useContext(AuthContext);

  const menuItems = [
    { label: "Home", route: "/" },
    {
      label: "Profile",
      route: "/profile",
    },
  ];

  if (!isSignedIn) {
    return null;
  }

  return (
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
  );
};
