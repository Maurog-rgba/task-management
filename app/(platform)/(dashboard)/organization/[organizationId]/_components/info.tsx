"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";

interface InfoProps {
  isPro: boolean;
}

export const Info = ({
  isPro
}: InfoProps) => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return <Info.Skeleton />;
  }

  return (
    <div className="fkex items-center gap-x-4">
      <div className="w-[68px] h-[60px] relative"  >
        <Image
          src={organization?.imageUrl!}
          alt="Organization"
          className="rounded-md object-cover"
          width={68}
          height={60}
        />
      </div>
      <div className="space-y-1 p-3">
        <p className="font-semibold text-xl">
          {organization?.name}
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="h-3 w-3 mr-1" />
          {isPro ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
}

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[68] h-[60px] relative">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-[200px] h-10" />
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};