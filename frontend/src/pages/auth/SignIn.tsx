import {
  Button,
  Card,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";

const SignIn: FC = () => {
  return (
    <VStack align="center" justify="center" pt={20}>
      <Card
        border="1px solid #eee"
        maxWidth="380px"
        width="full"
        px={6}
        py={10}
      >
        <Heading as="h2" textAlign="center">
          Sign In
        </Heading>

        <VStack
          as="form"
          spacing={6}
          align="flex-start"
          mt={8}
          onSubmit={(e) => {
            e.preventDefault();
            console.log({ e });
          }}
        >
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="john@example.com"
              required
              autoComplete="email"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" required autoComplete="current-password" />
          </FormControl>

          <div>
            Do not have an account yet?{" "}
            <Link color="blue" href="/auth/register">
              Register here.
            </Link>
          </div>

          <Button type="submit" colorScheme="facebook" mx="auto" mt={5}>
            Sign In
          </Button>
        </VStack>
      </Card>
    </VStack>
  );
};

export default SignIn;
