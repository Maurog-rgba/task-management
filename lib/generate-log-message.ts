import { ACTION, Activity } from "@prisma/client";

export const generateLogMessage = (log: Activity) => {
  const { action, entityTitle, entityType } = log;

  switch (action) {
    case ACTION.CREATE:
      return `Created ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `Updated ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `Deleted ${entityType.toLowerCase()} "${entityTitle}"`;
    default:
      return "Unknown action";
  }
};