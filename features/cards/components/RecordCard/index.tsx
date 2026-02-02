import { CheckCircle2, Circle, MessageCircle, Paperclip } from "lucide-react";
import * as motion from "motion/react-client";
import type { MouseEvent } from "react";
import { memo } from "react";

import { ICard } from "@/features/cards/types";
import { cn } from "@/lib/utils";

import { PRIORITY_COLORS } from "../../../lists/constants";

interface CardItemProps {
  card: ICard;
  onDoneToggle?: (done: boolean) => void;
  onClick?: () => void;
}

export default memo(function RecordList({
  card,
  onDoneToggle,
  onClick,
}: CardItemProps) {
  const priorityColor =
    PRIORITY_COLORS[card.priority as keyof typeof PRIORITY_COLORS];

  const onDoneToggleHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDoneToggle?.call(null, !card.done);
  };
  const onClickHandler = onClick?.bind(null);

  return (
    <motion.div
      layout
      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      whileTap={{ y: 0 }}
      onClick={onClickHandler}
      className={`bg-background rounded-lg p-3 border border-border cursor-pointer transition-all ${
        card.done ? "opacity-60" : ""
      }`}
    >
      <div className="space-y-2">
        {/* Title and Done Button */}
        <div className="flex items-start gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDoneToggleHandler}
            className="shrink-0 mt-0.5"
          >
            {card.done ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            )}
          </motion.button>
          <p
            className={cn(
              `text-sm font-medium flex-1`,
              card.done
                ? "line-through text-muted-foreground"
                : "text-foreground",
            )}
          >
            {card.title}
          </p>
        </div>

        {/* Description Preview */}
        {card.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 ml-7">
            {card.description}
          </p>
        )}

        {/* Labels */}
        {card.labels.length > 0 && (
          <div className="flex gap-1 flex-wrap ml-7">
            {card.labels.slice(0, 3).map((label) => (
              <span
                key={label.id}
                className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
              >
                {label.name}
              </span>
            ))}
            {card.labels.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                +{card.labels.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Priority Badge */}
        {card.priority !== "MEDIUM" && (
          <div className="ml-7">
            <span
              className={cn(
                `px-2 py-0.5 text-xs font-semibold rounded-full`,
                priorityColor,
              )}
            >
              {card.priority.toUpperCase()}
            </span>
          </div>
        )}

        {/* Meta Information */}
        <div className="flex items-center gap-2 ml-7 text-xs text-muted-foreground">
          {card.dueDate && (
            <span className="flex items-center gap-1">
              📅 {new Date(card.dueDate).toLocaleDateString()}
            </span>
          )}
          {card.checklists.length > 0 && (
            <span className="flex items-center gap-1">
              ✓ {card.checklists.filter((c) => c.done).length}/
              {card.checklists.length}
            </span>
          )}
          {card.comments.length > 0 && (
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {card.comments.length}
            </span>
          )}
          {card.attachments.length > 0 && (
            <span className="flex items-center gap-1">
              <Paperclip className="w-3 h-3" />
              {card.attachments.length}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
});
