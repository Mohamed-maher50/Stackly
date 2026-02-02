"use client";

import { MoreVertical } from "lucide-react";
import * as motion from "motion/react-client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IBoard } from "../../types";

interface BoardCardProps {
  board: IBoard;

  onClick: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  onArchive: (e: React.MouseEvent) => void;
  onToggleVisibility: (e: React.MouseEvent) => void;
}

export default function BoardCard({
  board,
  onClick,
  onDelete,
  onArchive,
  onToggleVisibility,
}: BoardCardProps) {
  const backgroundClass = `bg-gradient-to-br`;
  console.log(board);
  return (
    <motion.div
      whileHover={{ y: -4 }}
      style={{
        background: board.color.bgGradient,
      }}
      className={`${backgroundClass} rounded-lg group overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
      onClick={onClick}
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
            <div>📋 {board._count.lists} lists</div>
            <div>✏️ {board.total_cards} cards</div>
          </div>

          <DropdownMenu>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white   hover:bg-white/20 h-8 w-8"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onToggleVisibility}>
                    {board.visibility === "PRIVATE"
                      ? "Make Public"
                      : "Make Private"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onArchive}>
                    {board.archived ? "Unarchive" : "Archive"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onDelete}
                    className="text-destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </>
            </motion.div>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}
