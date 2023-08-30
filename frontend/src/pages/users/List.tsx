import { useCallback, useEffect, useState } from "react";
import Table from "rc-table";
import { User } from "../../types";
import {
  VStack,
  IconButton,
  ButtonGroup,
  Heading,
  Box,
  Input,
  Select,
  Flex,
  Button,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import fetcher from "../../utils/fetcher";
import { useToastError } from "../../hooks/useToastError";
import { ViewDataDrawer } from "../../components/ViewDataDrawer";
import { ColumnType } from "rc-table/lib/interface";
import { SaveDataDrawer } from "../../components/SaveDataDrawer";

export const ListUsersPage = () => {
  const toastError = useToastError();
  const [activeDrawer, setActiveDrawer] = useState<"view" | "edit" | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const columns: ColumnType<User>[] = [
    {
      title: "Id",
      key: "id",
      align: "left",
      render: (_, record) => <Box py={2}>{record.id}</Box>,
      width: 120,
    },
    {
      title: "Name",
      key: "name",
      align: "left",
      render: (_, record) => (
        <Box py={2}>
          {[record.first_name, record.last_name].filter(Boolean).join(" ")}
        </Box>
      ),
      width: 200,
    },
    {
      title: "Role",
      key: "role",
      align: "left",
      render: (_, record) => <Box py={2}>{record.role}</Box>,
      width: 200,
    },
    {
      title: "Status",
      key: "status",
      align: "left",
      render: (_, record) => <Box py={2}>{record.account_request_status}</Box>,
      width: 200,
    },
    {
      title: "Actions",
      key: "actions",
      align: "left",
      render: (_, record) => (
        <ButtonGroup
          variant="solid"
          size="xs"
          spacing={3}
          py={4}
          isDisabled={isSaving}>
          <IconButton
            colorScheme="blue"
            icon={<FiEye />}
            aria-label="Up"
            onClick={() => {
              setActiveDrawer("view");
              setActiveUser(record);
            }}
          />
          <IconButton
            colorScheme="green"
            icon={<AiFillEdit />}
            aria-label="Edit"
            onClick={() => {
              setActiveDrawer("edit");
              setActiveUser(record);
            }}
          />
          <IconButton
            colorScheme="red"
            variant="outline"
            icon={<BsFillTrashFill />}
            aria-label="Delete"
          />
        </ButtonGroup>
      ),
      width: 200,
    },
  ];

  useEffect(() => {
    fetcher
      .fetch("/users")
      .then((res) => {
        console.log({ res });
        if (res?.success && res?.data) {
          setUsers(res.data);
        } else if (res?.error?.message) {
          throw new Error(res.error.message);
        } else throw res;
      })
      .catch((err) =>
        toastError("Error fetching users data!", err?.message, "fetch-users")
      );
  }, [toastError]);

  const handleSave = useCallback(
    (values: Record<string, unknown>) => {
      console.log({ values });

      setIsSaving(true);

      fetcher
        .fetch(`/users/${activeUser?.id || ""}`, {
          method: activeUser ? "PUT" : "POST",
          body: JSON.stringify(values),
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) =>
          toastError("Error saving user!", err?.message, "crud-users-save")
        )
        .finally(() => setIsSaving(false));
    },
    [activeUser, toastError]
  );

  return (
    <VStack w="full" bg="#edf3f8" p={50} alignItems="flex-start" gap={8}>
      <Flex align="center" justify="space-between" width="full">
        <Heading>All users</Heading>

        <Button
          size="sm"
          colorScheme="facebook"
          onClick={() => {
            setActiveUser(null);
            setActiveDrawer("edit");
          }}>
          Create New
        </Button>
      </Flex>

      {activeDrawer === "view" && activeUser && (
        <ViewDataDrawer
          title={`Viewing user  #${activeUser.id}`}
          fields={[
            { label: "First Name", content: activeUser.first_name },
            { label: "Last Name", content: activeUser.last_name },
            { label: "Email", content: activeUser.email },
            { label: "Role", content: activeUser.role },
            {
              label: "Account Request Status",
              content: activeUser.account_request_status,
            },
          ]}
          onClose={() => {
            setActiveDrawer(null);
            setActiveUser(null);
          }}
        />
      )}

      {activeDrawer === "edit" && (
        <SaveDataDrawer
          title={activeUser ? `Editing user #${activeUser?.id}` : "Create user"}
          isCreating={!activeUser}
          isLoading={isSaving}
          fields={[
            {
              label: "First Name",
              render: (
                <Input
                  name="first_name"
                  defaultValue={activeUser?.first_name}
                  isRequired
                  w="full"
                />
              ),
            },
            {
              label: "Last Name",
              render: (
                <Input
                  name="last_name"
                  defaultValue={activeUser?.last_name}
                  w="full"
                />
              ),
            },
            {
              label: "Email",
              render: (
                <Input
                  name="email"
                  type="email"
                  defaultValue={activeUser?.email}
                  isRequired
                  w="full"
                />
              ),
            },
            {
              label: "Password",
              render: (
                <Input name="password" type="password" isRequired w="full" />
              ),
            },
            {
              label: "Role",
              render: (
                <Select defaultValue={activeUser?.role} isRequired name="role">
                  <option value="">Select one</option>
                  {(
                    ["ADMIN", "TRAINER", "MEMBER"] satisfies Array<User["role"]>
                  ).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              ),
            },
            {
              label: "Account Request Status",
              render: (
                <Select
                  defaultValue={activeUser?.account_request_status}
                  isRequired
                  name="account_request_status">
                  <option value="">Select one</option>
                  {(
                    ["REQUESTED", "CONFIRMED", "DENIED"] satisfies Array<
                      User["account_request_status"]
                    >
                  ).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              ),
            },
          ].filter((item) => (activeUser ? item.label !== "Password" : true))}
          onClose={() => {
            setActiveDrawer(null);
            setActiveUser(null);
          }}
          onSubmit={handleSave}
        />
      )}

      <Box bg="white" p={6} width="full">
        <Table columns={columns} data={users ?? []} rowKey="id" />
      </Box>
    </VStack>
  );
};
