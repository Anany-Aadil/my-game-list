import { STATUS_ORDER } from "./status-type";

export const sortItems = (games: any[], activeStatus: string) => {
  const sorted = [...games];

  if (activeStatus === "all") {
    sorted.sort((a, b) => {
      const statusDiff =
        STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);

      if (statusDiff !== 0) return statusDiff;

      return a.name.localeCompare(b.name);
    });
  } else {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  return sorted;
};
