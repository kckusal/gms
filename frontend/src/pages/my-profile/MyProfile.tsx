import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Heading,
  Box,
  VStack,
} from "@chakra-ui/react";
import { RequireAuth } from "../../components/RequireAuth";
import { useCallback, useEffect, useState } from "react";
import fetcher from "../../utils/fetcher";
import { User } from "../../types";
import { useToastError } from "../../hooks/useToastError";

export const MyProfile = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const toastError = useToastError();

  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetcher
      .fetch("/my/profile")
      .then((res) => {
        console.log(res);

        if (res?.success && res?.data) {
          setProfileData(res.data);
        } else {
          throw res;
        }
      })
      .catch((err) =>
        toastError("Error fetching profile!", err?.message, "fetch-profile")
      )
      .finally(() => setIsLoading(false));
  }, [toastError]);

  const onSubmit = useCallback(() => {}, []);

  return (
    <RequireAuth>
      <Box p={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading mb={4}>My Profile</Heading>

          <VStack mt={8} mb={3} spacing={4} maxW={360}>
            <FormControl isInvalid={!!errors.first_name} isRequired>
              <FormLabel htmlFor="first_name">First name</FormLabel>
              <Input
                id="first_name"
                placeholder="First name"
                defaultValue={profileData?.first_name}
                {...register("first_name", {
                  value: profileData?.first_name,
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
                bg="white"
              />
              <FormErrorMessage>
                {errors.first_name?.message?.toString() || ""}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.last_name}>
              <FormLabel htmlFor="last_name">Last name</FormLabel>
              <Input
                id="last_name"
                placeholder="Last name"
                defaultValue={profileData?.last_name}
                {...register("last_name")}
                bg="white"
              />
              <FormErrorMessage>
                {errors.last_name?.message?.toString() || ""}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="test@example.com"
                defaultValue={profileData?.email}
                {...register("email")}
                bg="white"
              />
              <FormErrorMessage>
                {errors.email?.message?.toString() || ""}
              </FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="role">Role:</FormLabel>

              <strong>{profileData?.role ?? null}</strong>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="account_request_status">
                Account Request Status:
              </FormLabel>

              <strong>{profileData?.account_request_status ?? null}</strong>
            </FormControl>
          </VStack>

          <Button
            mt={4}
            colorScheme="facebook"
            isLoading={isLoading || isSubmitting}
            type="submit">
            Save
          </Button>
        </form>
      </Box>
    </RequireAuth>
  );
};
