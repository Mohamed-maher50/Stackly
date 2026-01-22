import * as motion from "motion/react-client";

import { Board } from "../../types";

interface CompactBoardCardProps {
  board: Pick<Board, "id" | "title">;
  isActive: boolean;
  cardCount: number;
  onClick: (boardId: string) => void;
}

export default function CompactBoardCard({
  board,
  isActive,
  cardCount,
  onClick,
}: CompactBoardCardProps) {
  return (
    <motion.button
      key={board.id}
      whileHover={{ x: 4 }}
      onClick={() => onClick(board.id)}
      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-muted"
      }`}
    >
      <div className="truncate font-medium text-sm">{board.title}</div>
      <div className="text-xs text-muted-foreground truncate">
        {cardCount} cards
      </div>
    </motion.button>
  );
}
