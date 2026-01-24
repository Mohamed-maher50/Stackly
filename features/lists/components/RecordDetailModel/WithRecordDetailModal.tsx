"use client";

import { useState } from "react";

import {
  insertCommit,
  removeRecord,
  updateRecord,
} from "@/features/records/recordSlice";
import { updateActivityLogs } from "@/features/records/utils";
import { Priority } from "@/features/types";
import { useAppDispatch } from "@/lib/App.hooks";

import { IRecord } from "../../types";
import { RecordDetailModal } from ".";

interface WithRecordDetailModalProps {
  card: IRecord;
  onClose: () => void;
}

export default function WithRecordDetailModal({
  card,

  onClose,
}: WithRecordDetailModalProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const dispatch = useAppDispatch();
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    card.description ?? "",
  );

  const [newComment, setNewComment] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<Priority>(
    card.priority,
  );
  const [showActivityLog, setShowActivityLog] = useState(false);

  /* ------------------ Handlers ------------------ */

  const saveTitle = () => {
    if (editedTitle.trim() && editedTitle !== card.title) {
      dispatch(
        updateRecord({
          ...card,
          title: editedTitle,
          activityLog: updateActivityLogs("title", card.activityLog, {
            oldValue: card.title,
            value: editedTitle,
          }),
        }),
      );
    }
    setIsEditingTitle(false);
  };

  const saveDescription = () => {
    if (editedDescription !== card.description) {
      dispatch(
        updateRecord({
          ...card,
          description: editedDescription,
          activityLog: updateActivityLogs("description", card.activityLog, {
            oldValue: card.description,
            value: editedDescription,
          }),
        }),
      );
    }
    setIsEditingDescription(false);
  };

  const addComment = () => {
    if (!newComment.trim()) return;

    dispatch(
      insertCommit({
        comment: {
          text: newComment,
        },
        record: card,
      }),
    );
    dispatch(
      updateRecord({
        ...card,
        activityLog: updateActivityLogs("comment", card.activityLog, {
          oldValue: "",
          value: newComment,
        }),
      }),
    );
    setNewComment("");
  };

  const changePriority = (priority: Priority) => {
    setSelectedPriority(priority);

    dispatch(
      updateRecord({
        ...card,
        priority,
      }),
    );
  };

  const changeDueDate = (isoDate: string) => {
    dispatch(
      updateRecord({
        ...card,
        dueDate: isoDate,
      }),
    );
  };

  const toggleDone = () => {
    dispatch(
      updateRecord({
        ...card,
        done: true,
      }),
    );
    // updateCard(boardId, listId, card.id, { done: !card.done });
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this card?")) return;
    // deleteCard(boardId, listId, card.id);
    dispatch(removeRecord(card));
    onClose();
  };

  /* ------------------ Render ------------------ */

  return (
    <RecordDetailModal
      card={card}
      isEditingTitle={isEditingTitle}
      editedTitle={editedTitle}
      isEditingDescription={isEditingDescription}
      editedDescription={editedDescription}
      newComment={newComment}
      selectedPriority={selectedPriority}
      showActivityLog={showActivityLog}
      onClose={onClose}
      onEditTitleStart={() => setIsEditingTitle(true)}
      onEditTitleChange={setEditedTitle}
      onSaveTitle={saveTitle}
      onEditDescriptionStart={() => setIsEditingDescription(true)}
      onEditDescriptionChange={setEditedDescription}
      onSaveDescription={saveDescription}
      onCommentChange={setNewComment}
      onAddComment={addComment}
      onPriorityChange={changePriority}
      onDueDateChange={changeDueDate}
      onToggleDone={toggleDone}
      onDelete={handleDelete}
      onToggleActivityLog={() => setShowActivityLog((prev) => !prev)}
    />
  );
}
