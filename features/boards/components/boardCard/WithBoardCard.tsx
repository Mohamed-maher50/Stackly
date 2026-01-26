"use client";

import { BoardVisibility } from "@/features/types";
import { useAppDispatch } from "@/lib/App.hooks";
import { UpdateSection } from "@/lib/AppMainSlice";

import {
  removeBoard,
  toggleArchiveBoard,
  updateActiveBoard,
  updateBoard,
} from "../../boardSlice";
import { Board, BoardStats } from "../../types";
import BoardCard from ".";

interface BoardCardContainerProps {
  board: Board;
  stats: BoardStats;
}

export default function WithBoardCard({
  board,
  stats,
}: BoardCardContainerProps) {
  const dispatch = useAppDispatch();

  const handleCardClick = () => {
    dispatch(updateActiveBoard(board.id));
    dispatch(UpdateSection("lists"));
  };

  const handleDelete = () => dispatch(removeBoard(board));

  const handleArchive = () => dispatch(toggleArchiveBoard(board.id));

  const handleToggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    const visibility: BoardVisibility =
      board.visibility === "public" ? "private" : "public";
    dispatch(updateBoard({ ...board, visibility }));
  };

  return (
    <BoardCard
      board={board}
      stats={stats}
      onClick={handleCardClick}
      onDelete={handleDelete}
      onArchive={handleArchive}
      onToggleVisibility={handleToggleVisibility}
    />
  );
}
