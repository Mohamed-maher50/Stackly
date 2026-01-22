"use client";

import { CheckCircle2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import WithCompactBoard from "@/features/boards/components/boardCompactCard/WithCompactBoard";
import WithCreateBoard from "@/features/boards/components/WithCreateBoard";
import { CompactBoard } from "@/features/boards/types";

interface SidebarProps {
  currentPage: string;
  boards: CompactBoard[];
  activeBoardId?: string;
}

export default function AppSidebar({
  currentPage,
  boards,
  activeBoardId,
}: SidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        {/* Logo Area */}
        <div className="p-6 border-b border-border flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-primary" />
          <h1 className="text-lg font-bold">TaskBoard</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Boards List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <h2 className="text-xs font-semibold text-muted-foreground px-2 mb-3">
            RECENT BOARDS
          </h2>

          {boards.map((board) => (
            <WithCompactBoard
              key={board.id}
              board={board}
              isActive={
                currentPage === "board-detail" && activeBoardId === board.id
              }
            />
          ))}
        </div>

        <SidebarFooter>
          {/* Create Board */}
          <WithCreateBoard />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
