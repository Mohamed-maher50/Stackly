"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/lib/App.hooks";

import { insertBoard } from "../boardSlice";

// interface WithCreateBoardProps {}

export default function WithCreateBoard() {
  const [isCreating, setIsCreating] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const dispatch = useAppDispatch();
  const handleCreate = () => {
    if (boardTitle.trim()) {
      dispatch(insertBoard(boardTitle));
      setBoardTitle("");
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setBoardTitle("");
    setIsCreating(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreate();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className="p-4 border-t border-border space-y-3">
      {isCreating ? (
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Board name..."
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleCreate} className="flex-1">
              Create
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsCreating(true)}
          className="w-full gap-2"
          variant="outline"
        >
          <Plus className="w-4 h-4" />
          New Board
        </Button>
      )}
    </div>
  );
}
