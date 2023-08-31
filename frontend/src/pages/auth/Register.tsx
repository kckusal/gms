import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Link,
  Select,
  VStack,
} from "@chakra-ui/react";
import { FC, useCallback, useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useToastNotify } from "../../hooks/useToastNotify";
import fetcher from "../../utils/fetcher";

const Register: FC = () => {
  const { toastError, toastSuccess } = useToastNotify();
  const authData = useContext(AuthContext);

  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = useCallback(
    (values: Record<string, unknown>) => {
      setIsRegistering(true);
      fetcher
        .fetch(
          "/auth/register",
          {
            method: "POST",
            body: JSON.stringify(values),
          },
          { skipToken: true }
        )
        .then(() => {
          toastSuccess(
            "User registration success.",
            "An admin will have to confirm the user account before you can log in.",
            "register-msg"
          );
        })
        .catch((err) => {
          toastError("Registration failed!", err?.message, "register-msg");
        })
        .finally(() => setIsRegistering(false));
    },
    [toastError, toastSuccess]
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
          Register User
        </Heading>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            console.log(formData, Object.fromEntries(formData))
            handleSubmit(Object.fromEntries(formData));
          }}>
          <VStack
            spacing={6}
            align="flex-start"
            mt={8}
            onSubmit={(e) => {
              e.preventDefault();
              console.log({ e });
            }}>
            <HStack spacing={6}>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input type="text" name="first_name" />
              </FormControl>

              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" name="last_name" />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" placeholder="john@example.com" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" autoComplete="new-password" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>I am registering for role:</FormLabel>
              <Select name="role" placeholder="Select">
                <option value="MEMBE">Gym Member</option>
                <option value="TRAINER">Gym Trainer</option>
                <option value="ADMIN">Gym Administrator</option>
              </Select>
              <FormHelperText fontSize="xs">
                <strong>Note</strong>: A system admin will have to confirm and
                activate your account before you can use it.
              </FormHelperText>
            </FormControl>

            <div>
              Already have an account?{" "}
              <Link color="blue" href="/auth/signin">
                Login here.
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isRegistering}
              colorScheme="facebook"
              mx="auto"
              mt={5}>
              Create Account
            </Button>
          </VStack>
        </form>
      </Card>
    </VStack>
  );
};

export default Register;
