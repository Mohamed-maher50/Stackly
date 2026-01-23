"use client";

import { useAppDispatch } from "@/lib/App.hooks";
import { UpdateSection } from "@/lib/AppMainSlice";

import { updateActiveBoard } from "../../boardSlice";
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

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // onDelete(board.id);
  };

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    // onArchive(board.id);
  };

  const handleToggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    // onToggleVisibility(board.id, board.visibility);
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
