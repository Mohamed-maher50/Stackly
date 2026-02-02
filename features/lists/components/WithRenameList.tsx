import * as motion from "motion/react-client";
import { useState } from "react";

import { useAppDispatch } from "@/lib/App.hooks";

import { updateListThunk } from "../store/thunks.api";
import { IList } from "../types";

interface WithRenameListProps {
  initialTitle: string;
  list: IList;
}

const WithRenameList = ({ initialTitle, list }: WithRenameListProps) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(initialTitle);

  const dispatch = useAppDispatch();

  const handleSaveTitle = () => {
    if (editedTitle.trim()) {
      dispatch(
        updateListThunk({
          id: list.id,
          boardId: list.boardId,
          title: editedTitle,
        }),
      );
      setIsEditingTitle(false);
    } else {
      setEditedTitle(initialTitle);
      setIsEditingTitle(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveTitle();
    }
    if (e.key === "Escape") {
      setEditedTitle(initialTitle);
      setIsEditingTitle(false);
    }
  };

  return (
    <>
      {isEditingTitle ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleSaveTitle}
          onKeyPress={handleKeyPress}
          autoFocus
          className="flex-1 px-2 py-1 bg-background border border-border rounded text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
        />
      ) : (
        <motion.button
          whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
          onClick={() => setIsEditingTitle(true)}
          className="flex-1 text-left px-2 py-1 rounded font-semibold text-sm"
        >
          {editedTitle}
        </motion.button>
      )}
    </>
  );
};

export default WithRenameList;
