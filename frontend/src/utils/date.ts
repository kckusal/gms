export const getISODateString = (dateStr: string) => {
  return new Date(dateStr).toISOString();
};

export const displayISODate = (isoDateString: string) => {
  return new Date(isoDateString).toLocaleString();
};
