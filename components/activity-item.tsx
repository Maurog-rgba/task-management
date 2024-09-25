import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateLogMessage } from "@/lib/generate-log-message";
import { Activity } from "@prisma/client";

interface ActivityItemProps {
  data: Activity;
};

export const ActivityItem = ({
  data,
}: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} alt={data.userName} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {data.userName}
          </span> {generateLogMessage(data)}
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(data.createdAt).toLocaleString()}
        </p>
      </div>
    </li>
  );
};