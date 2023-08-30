import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider";
import SignIn from "./pages/auth/SignIn";
import Register from "./pages/auth/Register";
import Header from "./components/Header";
import SignOut from "./pages/auth/SignOut";
import { Sidebar } from "./components/Sidebar";
import { NotFoundPage } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <Header />

          <Flex align="flex-start" height="calc(100% - 60px)">
            <Sidebar />

            <Box
              bg="gray.100"
              width="full"
              height="full"
              minH="100%"
              overflowY="scroll">
              <Routes>
                <Route path="/" element={<div>Home page</div>} />
                <Route path="/auth/signout" Component={SignOut} />
                <Route path="/auth/signin" Component={SignIn} />
                <Route path="/auth/register" Component={Register} />

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
