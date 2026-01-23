"use client";

import { useState } from "react";

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
  const [isHovering, setIsHovering] = useState(false);

  const handleCardClick = () => {
    // onClick?.(board.id);
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
      isHovering={isHovering}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleCardClick}
      onDelete={handleDelete}
      onArchive={handleArchive}
      onToggleVisibility={handleToggleVisibility}
    />
  );
}
