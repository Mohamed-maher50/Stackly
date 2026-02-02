"use client";

import { MouseEvent } from "react";

import { Board } from "@/generated/prisma/client";
import { useAppDispatch } from "@/lib/App.hooks";
import { UpdateSection } from "@/lib/AppMainSlice";

import { toggleArchiveBoard, updateActiveBoard } from "../../store/slice";
import { deleteBoardThunk, updateBoardThunk } from "../../store/thunks.api";
import { IBoard } from "../../types";
import BoardCard from ".";

interface BoardCardContainerProps {
  board: IBoard;
}

export default function WithBoardCard({ board }: BoardCardContainerProps) {
  const dispatch = useAppDispatch();

  const handleCardClick = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(updateActiveBoard(board.id));
    dispatch(UpdateSection("lists"));
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteBoardThunk(board));
  };

  const handleArchive = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleArchiveBoard(board.id));
  };

  const handleToggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    const visibility: Board["visibility"] =
      board.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC";
    dispatch(updateBoardThunk({ visibility }));
  };

  return (
    <BoardCard
      board={board}
      onClick={handleCardClick}
      onDelete={handleDelete}
      onArchive={handleArchive}
      onToggleVisibility={handleToggleVisibility}
    />
  );
}
