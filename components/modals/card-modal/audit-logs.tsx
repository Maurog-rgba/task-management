"use client";

import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity } from "@prisma/client";
import { ActivityIcon } from "lucide-react";

interface ActivityProps {
  data: Activity[];
};

export const AuditLogs = ({
  data,
}: ActivityProps) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">
          Activity
        </p>
        <ol className="mt-2 space-y-4">
          {data.map
            ((activity) => (
              <ActivityItem key={activity.id} data={activity} />
            ))}
        </ol>
      </div>
    </div>
  );
};

AuditLogs.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200 rounded-full" />
      <div className="w-full ">
        <Skeleton className="h-6 w-24 mb-2 bg-neutral-200 rounded-full" />
        <Skeleton className="h-10 w-full bg-neutral-200 rounded-full" />
      </div>
    </div>
  );
}