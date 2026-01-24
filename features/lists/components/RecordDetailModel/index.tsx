"use client";

import {
  Calendar,
  Flag,
  History,
  MessageSquare,
  Trash2,
  X,
} from "lucide-react";
import { div as MotionDiv } from "motion/react-client";

import { Button } from "@/components/ui/button";
import WithClientAnimatedPresence from "@/components/WithClientAnimatedPresence";
import { IComment, Priority } from "@/features/types";

import { IRecord } from "../../types";

interface CardDetailModalViewProps {
  card: IRecord;

  isEditingTitle: boolean;
  editedTitle: string;
  isEditingDescription: boolean;
  editedDescription: string;
  newComment: string;
  selectedPriority: Priority;
  showActivityLog: boolean;

  onClose: () => void;

  onEditTitleStart: () => void;
  onEditTitleChange: (value: string) => void;
  onSaveTitle: () => void;

  onEditDescriptionStart: () => void;
  onEditDescriptionChange: (value: string) => void;
  onSaveDescription: () => void;

  onCommentChange: (value: string) => void;
  onAddComment: () => void;

  onPriorityChange: (priority: Priority) => void;
  onDueDateChange: (isoDate: string) => void;

  onToggleDone: () => void;
  onDelete: () => void;

  onToggleActivityLog: () => void;
}

export function RecordDetailModal({
  card,
  isEditingTitle,
  editedTitle,
  isEditingDescription,
  editedDescription,
  newComment,
  selectedPriority,
  showActivityLog,

  onClose,
  onEditTitleStart,
  onEditTitleChange,
  onSaveTitle,
  onEditDescriptionStart,
  onEditDescriptionChange,
  onSaveDescription,
  onCommentChange,
  onAddComment,
  onPriorityChange,
  onDueDateChange,
  onToggleDone,
  onDelete,
  onToggleActivityLog,
}: CardDetailModalViewProps) {
  const priorityColors: Record<Priority, string> = {
    low: "text-blue-600",
    medium: "text-amber-600",
    high: "text-orange-600",
    urgent: "text-red-600",
  };

  return (
    <WithClientAnimatedPresence>
      <MotionDiv
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <MotionDiv
          className="bg-card rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-card border-b p-6 flex justify-between">
            <h2 className="text-2xl font-bold truncate">{card.title}</h2>
            <Button size="icon" variant="ghost" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Title */}
            {isEditingTitle ? (
              <input
                autoFocus
                value={editedTitle}
                onChange={(e) => onEditTitleChange(e.target.value)}
                onBlur={onSaveTitle}
                onKeyDown={(e) => e.key === "Enter" && onSaveTitle()}
                className="w-full border rounded px-3 py-2"
              />
            ) : (
              <button
                onClick={onEditTitleStart}
                className="text-lg font-semibold text-left w-full"
              >
                {card.title}
              </button>
            )}

            {/* Description */}
            {isEditingDescription ? (
              <textarea
                autoFocus
                rows={4}
                value={editedDescription}
                onChange={(e) => onEditDescriptionChange(e.target.value)}
                onBlur={onSaveDescription}
                className="w-full border rounded px-3 py-2"
              />
            ) : (
              <button
                onClick={onEditDescriptionStart}
                className="w-full text-left text-muted-foreground"
              >
                {editedDescription || "Add a description..."}
              </button>
            )}

            {/* Priority & Due Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Flag className="w-4 h-4" /> Priority
                </label>
                {(["low", "medium", "high", "urgent"] as Priority[]).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => onPriorityChange(p)}
                      className={`block w-full text-left px-2 py-1 rounded ${
                        selectedPriority === p
                          ? `${priorityColors[p]} bg-muted font-semibold`
                          : "text-muted-foreground"
                      }`}
                    >
                      {p.toUpperCase()}
                    </button>
                  ),
                )}
              </div>

              <div>
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Due Date
                </label>
                <input
                  type="date"
                  value={card.dueDate?.split("T")[0] || ""}
                  onChange={(e) =>
                    onDueDateChange(
                      e.target.value
                        ? new Date(e.target.value).toISOString()
                        : "",
                    )
                  }
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Comments ({card.comments.length})
              </label>

              <div className="space-y-2 my-3">
                {card.comments.map((c: IComment) => (
                  <div key={c.id} className="bg-muted p-3 rounded">
                    <div className="text-xs text-muted-foreground">
                      {c.user} · {new Date(c.timestamp).toLocaleDateString()}
                    </div>
                    <p>{c.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  value={newComment}
                  onChange={(e) => onCommentChange(e.target.value)}
                  className="flex-1 border rounded px-3 py-2"
                  placeholder="Add a comment..."
                />
                <Button size="sm" onClick={onAddComment}>
                  Send
                </Button>
              </div>
            </div>

            {/* Activity */}
            <button
              onClick={onToggleActivityLog}
              className="text-sm flex items-center gap-2"
            >
              <History className="w-4 h-4" />
              Activity Log ({card.activityLog.length})
            </button>

            {showActivityLog && (
              <div className="space-y-1 text-xs">
                {[...card.activityLog].reverse().map((log) => (
                  <div key={log.id} className="flex flex-col gap-0.5">
                    <div>
                      <strong>{log.user}</strong> {log.action}
                    </div>
                    <p className="text-xs text-muted-foreground ">
                      {log.details}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t flex gap-2">
              <Button variant="outline" size="sm" onClick={onToggleDone}>
                {card.done ? "Mark as To Do" : "Mark as Done"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onDelete}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </MotionDiv>
      </MotionDiv>
    </WithClientAnimatedPresence>
  );
}
