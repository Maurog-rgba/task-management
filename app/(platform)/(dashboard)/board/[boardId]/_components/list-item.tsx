"use client";

import { cn } from "@/lib/utils";
import { ListWithCards } from "@/types";
import { ElementRef, useEffect, useRef, useState } from "react";
import { CardForm } from "./card-form";
import { CardItem } from "./card-item";
import { ListHeader } from "./list-header";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

export const ListItem = ({
  data,
  index,
}: ListItemProps) => {
  const textAreaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing) {
      textAreaRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader
          data={data}
          onAddCard={enableEditing}
        />
        <ol

          className={
            cn(
              "mx-1 px-1 py-0.5 flex flex-col gap-y2",
              data.cards.length === 0 && "mt-2"
            )
          }
        >
          {data.cards.map((card, index) => (
            <CardItem
              index={index}
              key={card.id}
              data={card}
            />
          ))}
        </ol>
        <CardForm
          listId={data.id}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
};