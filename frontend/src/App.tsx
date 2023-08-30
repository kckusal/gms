import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider";
import SignIn from "./pages/auth/SignIn";
import Register from "./pages/auth/Register";
import Header from "./components/Header";
import SignOut from "./pages/auth/SignOut";
import { Sidebar } from "./components/Sidebar";
import { NotFoundPage } from "./pages/NotFound";
import { MyProfile } from "./pages/my-profile/MyProfile";
import { IndexPage } from "./pages/IndexPage";

import { chakraProviderProps } from "./config";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider {...chakraProviderProps}>
        <AuthProvider>
          <Header />

          <Flex align="flex-start" height="calc(100% - 60px)" bg="gray.100">
            <Sidebar />

            <Box width="full" height="full" minH="100%" overflowY="scroll">
              <Routes>
                <Route path="/" Component={IndexPage} />
                <Route path="/auth/signout" Component={SignOut} />
                <Route path="/auth/signin" Component={SignIn} />
                <Route path="/auth/register" Component={Register} />

                <Route path="/my-profile" Component={MyProfile} />

                <Route path="*" Component={NotFoundPage} />
              </Routes>
            </Box>
          </Flex>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
