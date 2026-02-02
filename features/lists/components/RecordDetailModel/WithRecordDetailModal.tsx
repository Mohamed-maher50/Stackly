"use client";

import { useCallback, useState } from "react";

import {
  addCommentThunk,
  deleteCardThunk,
  updateCardThunk,
} from "@/features/cards/store/thunks.api";
import { ICard } from "@/features/cards/types";
import { useAppDispatch } from "@/lib/App.hooks";

import RecordDetailModal from ".";

interface WithRecordDetailModalProps {
  card: ICard;
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
  const [selectedPriority, setSelectedPriority] = useState<ICard["priority"]>(
    card.priority,
  );
  const [showActivityLog, setShowActivityLog] = useState(false);

  /* ------------------ Handlers ------------------ */

  const saveTitle = () => {
    if (editedTitle.trim() && editedTitle !== card.title) {
      dispatch(
        updateCardThunk({
          ...card,
          title: editedTitle,
        }),
      );
    }
    setIsEditingTitle(false);
  };

  const saveDescription = useCallback(() => {
    if (editedDescription !== card.description) {
      dispatch(
        updateCardThunk({
          ...card,
          description: editedDescription,
        }),
      );
    }
    setIsEditingDescription(false);
  }, [card, dispatch, editedDescription]);

  const addComment = useCallback(() => {
    if (!newComment.trim()) return;

    dispatch(
      addCommentThunk({
        ...card,
        text: newComment,
        cardId: card.id,
      }),
    );

    dispatch(
      updateCardThunk({
        ...card,
      }),
    );
    setNewComment("");
  }, [card, dispatch, newComment]);

  const changePriority = useCallback(
    (priority: ICard["priority"]) => {
      setSelectedPriority(priority);

      dispatch(
        updateCardThunk({
          ...card,
          priority,
        }),
      );
    },
    [card, dispatch],
  );

  const changeDueDate = useCallback(
    (isoDate: Date) => {
      dispatch(
        updateCardThunk({
          ...card,
          dueDate: isoDate,
        }),
      );
    },
    [card, dispatch],
  );

  const toggleDone = useCallback(() => {
    dispatch(
      updateCardThunk({
        ...card,
        done: true,
      }),
    );
  }, [card, dispatch]);

  const handleDelete = useCallback(() => {
    if (!confirm("Are you sure you want to delete this card?")) return;
    dispatch(deleteCardThunk(card));
    onClose();
  }, [card, dispatch, onClose]);

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
