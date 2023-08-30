import {
  Button,
  Card,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FC, FormEvent, useCallback, useContext, useState } from "react";

import apiFetcher from "../../utils/fetcher";
import { AuthContext } from "../../providers/AuthProvider";

const SignIn: FC = () => {
  const authData = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);

      const email = data.get("email");
      const password = data.get("password");

      setIsLoading(true);
      toast.close("signin-status");
      apiFetcher
        .fetch(
          "/auth/signin",
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
          },
          { skipToken: true }
        )
        .then((res) => {
          toast({
            id: "signin-status",
            title: "Signed in successfully!",
            status: "success",
            isClosable: true,
          });

          authData.setData({
            jwtToken: res?.data?.jwt,
            user: res?.data?.user,
          });
        })
        .catch((err) => {
          console.error(err);
          toast({
            id: "signin-status",
            title: "Failed to sign in",
            description: err?.message,
            status: "error",
            isClosable: true,
          });
          authData.setData(null);
        })
        .finally(() => setIsLoading(false));
    },
    [authData, toast]
  );

  if (authData.data?.user) {
    return null;
  }

  return (
    <VStack align="center" justify="center" pt={20}>
      <Card
        border="1px solid #eee"
        maxWidth="380px"
        width="full"
        px={6}
        py={10}>
        <Heading as="h2" textAlign="center">
          Sign In
        </Heading>

        <form onSubmit={onSubmit}>
          <VStack spacing={6} align="flex-start" mt={8}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="john@example.com"
                required
                autoComplete="email"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                required
                autoComplete="current-password"
              />
            </FormControl>

            <div>
              Do not have an account yet?{" "}
              <Link color="blue" href="/auth/register">
                Register here.
              </Link>
            </div>

            <Button
              type="submit"
              colorScheme="facebook"
              mx="auto"
              mt={5}
              isLoading={isLoading}
              loadingText="Signing in...">
              Sign In
            </Button>
          </VStack>
        </form>
      </Card>
    </VStack>
  );
};

export default SignIn;
