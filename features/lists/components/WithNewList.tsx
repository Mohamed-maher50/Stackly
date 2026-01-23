import { Plus } from "lucide-react";
import * as motion from "motion/react-client";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const WithNewList = () => {
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleCreateCard = () => {
    if (newCardTitle.trim()) {
      console.log("Creating card:", newCardTitle);
      setNewCardTitle("");
      setIsCreatingCard(false);
    }
  };

  const handleCancel = () => {
    setIsCreatingCard(false);
    setNewCardTitle("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreateCard();
    }
  };

  return (
    <>
      {isCreatingCard ? (
        <div className="bg-background rounded-lg p-3 space-y-2">
          <input
            type="text"
            placeholder="Card title..."
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
            className="w-full px-2 py-1 bg-card border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleCreateCard} className="flex-1">
              Add
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
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          onClick={() => setIsCreatingCard(true)}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:bg-background transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Card
        </motion.button>
      )}
    </>
  );
};

export default WithNewList;
