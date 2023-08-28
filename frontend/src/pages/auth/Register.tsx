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
import { FC } from "react";

const Register: FC = () => {
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
          Register User
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
          <HStack spacing={6}>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input type="text" />
            </FormControl>
          </HStack>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="john@example.com" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>I am registering for role:</FormLabel>
            <Select placeholder="Select">
              <option value="Gym Member">Gym Member</option>
              <option value="Gym Trainer">Gym Trainer</option>
              <option value="Gym Administrator">Gym Administrator</option>
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

          <Button type="submit" colorScheme="facebook" mx="auto" mt={5}>
            Create Account
          </Button>
        </VStack>
      </Card>
    </VStack>
  );
};

export default Register;
