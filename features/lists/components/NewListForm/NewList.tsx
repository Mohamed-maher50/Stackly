import { Plus } from "lucide-react";
import * as motion from "motion/react-client";

import { Button } from "@/components/ui/button";

interface CreateListPresenterProps {
  isCreatingList: boolean;
  newListTitle: string;
  onTitleChange: (value: string) => void;
  onCreate: () => void;
  onCancel: () => void;
  onStartCreate: () => void;
}

export function NewList({
  isCreatingList,
  newListTitle,
  onTitleChange,
  onCreate,
  onCancel,
  onStartCreate,
}: CreateListPresenterProps) {
  return (
    <motion.div layout className="shrink-0 w-72">
      {isCreatingList ? (
        <div className="bg-muted rounded-lg p-4 space-y-2">
          <input
            type="text"
            placeholder="List name..."
            value={newListTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onCreate()}
            autoFocus
            className="w-full px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="flex gap-2">
            <Button size="sm" onClick={onCreate} className="flex-1">
              Add List
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={onStartCreate}
          className="w-full gap-2 h-12"
          variant="outline"
        >
          <Plus className="w-4 h-4" />
          Add List
        </Button>
      )}
    </motion.div>
  );
}
