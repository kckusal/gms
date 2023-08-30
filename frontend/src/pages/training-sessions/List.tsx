import { useCallback, useEffect, useState } from "react";
import Table from "rc-table";
import { TrainingSession } from "../../types";
import {
  VStack,
  IconButton,
  ButtonGroup,
  Heading,
  Box,
  Input,
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
import { DatePicker } from "../../components/form/DatePicker";
import { displayISODate, getISODateString } from "../../utils/date";

export const ListTrainingSessionsPage = () => {
  const toastError = useToastError();
  const [activeDrawer, setActiveDrawer] = useState<"view" | "edit" | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [activeRecord, setActiveRecord] = useState<TrainingSession | null>(
    null
  );
  const [records, setRecords] = useState<TrainingSession[]>([]);

  const columns: ColumnType<TrainingSession>[] = [
    {
      title: "Id",
      key: "id",
      align: "left",
      render: (_, record) => <Box py={2}>{record.id}</Box>,
      width: 120,
    },
    {
      title: "Trainer ID",
      key: "trainer",
      align: "left",
      render: (_, record) => <Box py={2}>{record.trainer_id}</Box>,
      width: 200,
    },
    {
      title: "Start Date",
      key: "start_dt",
      align: "left",
      render: (_, record) => (
        <Box py={2}>{displayISODate(record.start_datetime)}</Box>
      ),
      width: 200,
    },
    {
      title: "End Date",
      key: "end_dt",
      align: "left",
      render: (_, record) => (
        <Box py={2}>{displayISODate(record.end_datetime)}</Box>
      ),
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
              setActiveRecord(record);
            }}
          />
          <IconButton
            colorScheme="green"
            icon={<AiFillEdit />}
            aria-label="Edit"
            onClick={() => {
              setActiveDrawer("edit");
              setActiveRecord(record);
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
      .fetch("/training-sessions")
      .then((res) => {
        console.log({ res });
        if (res?.success && res?.data) {
          setRecords(res.data);
        } else if (res?.error?.message) {
          throw new Error(res.error.message);
        } else throw res;
      })
      .catch((err) =>
        toastError(
          "Error fetching training sessions data!",
          err?.message,
          "fetch-training-sessions"
        )
      );
  }, [toastError]);

  const handleSave = useCallback(
    (values: Record<string, unknown>) => {
      const { start_datetime, end_datetime } =
        values as unknown as TrainingSession;
      const requestBody: Partial<TrainingSession> = {
        ...values,

        trainer_id: Number(values.trainer_id),
        ...(start_datetime && {
          start_datetime: getISODateString(start_datetime),
        }),
        ...(end_datetime && {
          end_datetime: getISODateString(end_datetime),
        }),
      };
      console.log({ requestBody });

      setIsSaving(true);

      fetcher
        .fetch(`/training-sessions/${activeRecord?.id || ""}`, {
          method: activeRecord ? "PUT" : "POST",
          body: JSON.stringify(requestBody),
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) =>
          toastError("Error saving record!", err?.message, "crud-record-save")
        )
        .finally(() => setIsSaving(false));
    },
    [activeRecord, toastError]
  );

  return (
    <VStack w="full" bg="#edf3f8" p={50} alignItems="flex-start" gap={8}>
      <Flex align="center" justify="space-between" width="full">
        <Heading>All training sessions</Heading>

        <Button
          size="sm"
          colorScheme="facebook"
          onClick={() => {
            setActiveRecord(null);
            setActiveDrawer("edit");
          }}>
          Create New
        </Button>
      </Flex>

      {activeDrawer === "view" && activeRecord && (
        <ViewDataDrawer
          title={`Viewing record  #${activeRecord.id}`}
          fields={[
            { label: "Trainer", content: activeRecord.trainer_id },
            {
              label: "Start Date",
              content: displayISODate(activeRecord.start_datetime),
            },
            {
              label: "End Date",
              content: displayISODate(activeRecord.end_datetime),
            },
          ]}
          onClose={() => {
            setActiveDrawer(null);
            setActiveRecord(null);
          }}
        />
      )}

      {activeDrawer === "edit" && (
        <SaveDataDrawer
          title={
            activeRecord
              ? `Edit training session #${activeRecord?.id}`
              : "Create training session"
          }
          isCreating={!activeRecord}
          isLoading={isSaving}
          fields={[
            {
              label: "Trainer ID",
              render: (
                <Input
                  name="trainer_id"
                  defaultValue={activeRecord?.trainer_id}
                  isRequired
                  w="full"
                />
              ),
            },
            {
              label: "Start Date",
              render: (
                <>
                  <DatePicker
                    name="start_datetime"
                    isRequired
                    defaultValue={activeRecord?.start_datetime}
                  />
                </>
              ),
            },
            {
              label: "End Date",
              render: (
                <>
                  <DatePicker
                    name="end_datetime"
                    isRequired
                    defaultValue={activeRecord?.end_datetime}
                  />
                </>
              ),
            },
          ]}
          onClose={() => {
            setActiveDrawer(null);
            setActiveRecord(null);
          }}
          onSubmit={handleSave}
        />
      )}

      <Box bg="white" p={6} width="full">
        <Table columns={columns} data={records ?? []} rowKey="id" />
      </Box>
    </VStack>
  );
};
