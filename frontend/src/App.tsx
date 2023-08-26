import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider";
import SignIn from "./pages/auth/SignIn";
import Register from "./pages/auth/Register";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <Header />

          <Routes>
            <Route path="/" element={<div>Home page</div>} />
            <Route path="/auth/signin" Component={SignIn} />
            <Route path="/auth/register" Component={Register} />

            <Route path="*" Component={ErrorPage} />
          </Routes>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
