export const getDateToSave = (date: Date) => {
  const years = date.getFullYear();
  const months = (date.getMonth() + 1).toString().padStart(2, "0");
  const days = date.getDate().toString().padStart(2, "0");

  const hours = date.getHours().toString().padStart(2, "0");
  const mins = date.getMinutes().toString().padStart(2, "0");

  return {
    date: `${years}-${months}-${days}`,
    HHmm: `${hours}:${mins}`,
  };
};

export const parseSavedDate = (date: string, HHmm: string) => {
  const parsed = new Date();

  const [years, months, days] = date.split("-");
  parsed.setFullYear(Number(years));
  parsed.setMonth(Number(months) - 1);
  parsed.setDate(Number(days));

  const [HH, mm] = HHmm.split(":");
  parsed.setHours(Number(HH));
  parsed.setMinutes(Number(mm));

  return { parsed };
};
