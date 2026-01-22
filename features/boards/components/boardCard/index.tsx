"use client";

import { MoreVertical } from "lucide-react";
import * as motion from "motion/react-client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Board } from "../../types";

interface BoardStats {
  totalCards: number;
  completedCards: number;
  overdueCards: number;
}

interface BoardCardProps {
  board: Board;
  stats: BoardStats;
  onDelete: (boardId: string) => void;
  onArchive: (boardId: string) => void;
  onToggleVisibility: (
    boardId: string,
    currentVisibility: "private" | "public",
  ) => void;
  onClick?: (boardId: string) => void;
}

export default function BoardCard({
  board,
  stats,
  onDelete,
  onArchive,
  onToggleVisibility,
  onClick,
}: BoardCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  const backgroundClass = `bg-gradient-to-br ${board.color.bgGradient}`;

  const handleCardClick = () => {
    onClick?.(board.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(board.id);
  };

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    onArchive(board.id);
  };

  const handleToggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleVisibility(board.id, board.visibility);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`${backgroundClass} rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleCardClick}
    >
      {/* Background gradient overlay */}
      <div className="p-6 text-white h-48 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <h3 className="text-xl font-bold line-clamp-2">{board.title}</h3>
          <p className="text-sm text-white/80 line-clamp-1 mt-1">
            {board.description}
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="text-xs text-white/90 space-y-1">
            <div>📋 {stats.totalCards} cards</div>
            <div>✓ {stats.completedCards} done</div>
            {stats.overdueCards > 0 && (
              <div>⏰ {stats.overdueCards} overdue</div>
            )}
          </div>

          {isHovering && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 h-8 w-8"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleToggleVisibility}>
                    {board.visibility === "private"
                      ? "Make Public"
                      : "Make Private"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleArchive}>
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
