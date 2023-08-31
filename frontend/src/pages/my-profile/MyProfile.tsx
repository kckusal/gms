import {
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
import { useToastNotify } from "../../hooks/useToastNotify";

export const MyProfile = () => {
  const { toastError, toastSuccess } = useToastNotify();

  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<User | null>(null);

  useEffect(() => {
    if (profileData) return;
    setIsLoading(true);
    fetcher
      .fetch("/my/profile")
      .then((res) => {
        if (res?.data) {
          setProfileData(res.data);
        } else throw res;
      })
      .catch((err) =>
        toastError("Error fetching profile!", err?.message, "fetch-profile")
      )
      .finally(() => setIsLoading(false));
  }, [toastError, profileData]);

  const onSaveProfile = useCallback(
    (values: Record<string, unknown>) => {
      fetcher
        .fetch("/my/profile", {
          method: "PUT",
          body: JSON.stringify(values),
        })
        .then(() => {
          setProfileData(null);
          toastSuccess("Profile saved.", "", "save-profile");
        })
        .catch((e) =>
          toastError("Error saving profile!", e?.message, "save-profile")
        );
    },
    [toastError, toastSuccess]
  );

  return (
    <RequireAuth>
      <Box p={12}>
        <form
          autoComplete="new-form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            onSaveProfile(Object.fromEntries(formData));
          }}>
          <Heading mb={4}>My Profile</Heading>

          <VStack mt={8} mb={3} spacing={4} maxW={360}>
            <FormControl isRequired>
              <FormLabel htmlFor="first_name">First name</FormLabel>
              <Input
                id="first_name"
                placeholder="First name"
                defaultValue={profileData?.first_name}
                name="first_name"
                bg="white"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="last_name">Last name</FormLabel>
              <Input
                id="last_name"
                placeholder="Last name"
                defaultValue={profileData?.last_name}
                name="last_name"
                bg="white"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="test@example.com"
                defaultValue={profileData?.email}
                name="email"
                bg="white"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">New Password</FormLabel>
              <Input
                id="password"
                type="password"
                name="password"
                bg="white"
                autoComplete="new-password"
                defaultValue={""}
              />
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
            isLoading={isLoading}
            type="submit">
            Save
          </Button>
        </form>
      </Box>
    </RequireAuth>
  );
};
