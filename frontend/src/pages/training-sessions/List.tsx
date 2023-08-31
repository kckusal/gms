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
import { useToastNotify } from "../../hooks/useToastNotify";
import { ViewDataDrawer } from "../../components/ViewDataDrawer";
import { ColumnType } from "rc-table/lib/interface";
import { SaveDataDrawer } from "../../components/SaveDataDrawer";
import { DatePicker } from "../../components/form/DatePicker";
import { TimePicker } from "../../components/form/TimePicker";

export const ListTrainingSessionsPage = () => {
  const { toastError, toastSuccess } = useToastNotify();
  const [activeDrawer, setActiveDrawer] = useState<"view" | "edit" | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [activeRecord, setActiveRecord] = useState<TrainingSession | null>(
    null
  );
  const [records, setRecords] = useState<null | TrainingSession[]>(null);

  const columns: ColumnType<TrainingSession>[] = [
    {
      title: "Id",
      key: "id",
      align: "left",
      render: (_, record) => <Box py={2}>{record.id}</Box>,
      width: 60,
    },
    {
      title: "Trainer ID",
      key: "trainer",
      align: "left",
      render: (_, record) => <Box py={2}>{record.trainer_id}</Box>,
      width: 100,
    },
    {
      title: "Start DateTime",
      key: "start_dt",
      align: "left",
      render: (_, record) => (
        <Box py={2} fontSize="sm">
          {`${record.start_date} ${record.start_HHmm}`}
        </Box>
      ),
      width: 200,
    },
    {
      title: "End DateTime",
      key: "end_dt",
      align: "left",
      render: (_, record) => (
        <Box py={2} fontSize="sm">
          {`${record.end_date} ${record.end_HHmm}`}
        </Box>
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
      width: 80,
    },
  ];

  useEffect(() => {
    if (records) return;

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
  }, [toastError, records]);

  const handleSave = useCallback(
    (values: Record<string, unknown>) => {
      const { start_date, end_date, start_HHmm, end_HHmm } =
        values as unknown as TrainingSession;

      console.log(values);

      const requestBody: Partial<TrainingSession> = {
        trainer_id: Number(values.trainer_id),
        start_date,
        start_HHmm,
        end_date,
        end_HHmm,
      };
      console.log({ requestBody });

      setIsSaving(true);

      fetcher
        .fetch(`/training-sessions/${activeRecord?.id || ""}`, {
          method: activeRecord ? "PUT" : "POST",
          body: JSON.stringify(requestBody),
        })
        .then(() => {
          toastSuccess(
            "Training session details saved!",
            "",
            "crud-record-save"
          );
          setRecords(null);
        })
        .catch((err) =>
          toastError("Error saving record!", err?.message, "crud-record-save")
        )
        .finally(() => setIsSaving(false));
    },
    [activeRecord, toastError, toastSuccess]
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
              label: "Start DateTime",
              content: `${activeRecord.start_date} ${activeRecord.start_HHmm}`,
            },
            {
              label: "End DateTime",
              content: `${activeRecord.end_date} ${activeRecord.end_HHmm}`,
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
                    name="start_date"
                    isRequired
                    defaultValue={activeRecord?.start_date}
                  />
                </>
              ),
            },
            {
              label: "Start Time",
              render: (
                <>
                  <TimePicker
                    name="start_HHmm"
                    isRequired
                    defaultValue={activeRecord?.start_HHmm}
                  />
                </>
              ),
            },
            {
              label: "End Date",
              render: (
                <>
                  <DatePicker
                    name="end_date"
                    isRequired
                    defaultValue={activeRecord?.end_date}
                  />
                </>
              ),
            },
            {
              label: "End Time",
              render: (
                <>
                  <TimePicker
                    name="end_HHmm"
                    isRequired
                    defaultValue={activeRecord?.end_HHmm}
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
