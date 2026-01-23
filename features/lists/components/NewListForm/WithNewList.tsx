import { useState } from "react";

import { currentBoard } from "@/features/stores";
import { useAppDispatch, useAppSelector } from "@/lib/App.hooks";

import { insertList } from "../../listSlice";
import { NewList } from "./NewList";

interface WithNewListProps {
  onInsert: () => void;
}
export default function WithNewList({ onInsert }: WithNewListProps) {
  const [isCreatingList, setIsCreatingList] = useState(false);

  const [newListTitle, setNewListTitle] = useState("");
  const board = useAppSelector(currentBoard);
  const dispatch = useAppDispatch();
  const handleCreateList = () => {
    if (!newListTitle.trim() || !board) return;
    dispatch(
      insertList({
        boardId: board.id,
        title: newListTitle,
      }),
    );
    setNewListTitle("");
    setIsCreatingList(false);
    onInsert();
  };
  return (
    <NewList
      isCreatingList={isCreatingList}
      newListTitle={newListTitle}
      onTitleChange={setNewListTitle}
      onCreate={handleCreateList}
      onCancel={() => {
        setIsCreatingList(false);
        setNewListTitle("");
      }}
      onStartCreate={() => setIsCreatingList(true)}
    />
  );
}
