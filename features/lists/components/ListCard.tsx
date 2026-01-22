import { Archive, ChevronDown, Plus, Trash2 } from "lucide-react";
import * as motion from "motion/react-client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WithClientAnimatedPresence from "@/components/WithClientAnimatedPresence";

import { List } from "../types";
import ListCardItem from "./ListItemCard";
export interface ListColumnProps {
  list: List;
  boardId: string;
  isCreatingCard: boolean;
  newCardTitle: string;
  isExpanded: boolean;
  isEditingTitle: boolean;
  editedTitle: string;
  onCreateCardStart: () => void;
  onCreateCardCancel: () => void;
  onCreateCard: () => void;
  onNewCardTitleChange: (title: string) => void;
  onToggleExpand: () => void;
  onEditTitleStart: () => void;
  onSaveTitle: () => void;
  onEditedTitleChange: (title: string) => void;
  onArchiveList: () => void;
  onDeleteList: () => void;
}

export default function ListCard(props: ListColumnProps) {
  const cardCount = props.list.cards.length;

  const completedCount = props.list.cards.filter((c) => c.done).length;

  return (
    <motion.div
      layout
      className="w-72 shrink-0 bg-muted rounded-lg overflow-hidden flex flex-col max-h-full"
    >
      {/* Header */}
      <div className={`${props.list.accentColor} p-4 border-b border-border`}>
        <div className="flex items-center justify-between gap-2 mb-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            // onClick={() => props.setIsExpanded(!props.isExpanded)}
            className="shrink-0"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                props.isExpanded ? "rotate-0" : "-rotate-90"
              }`}
            />
          </motion.button>

          {props.isEditingTitle ? (
            <input
              type="text"
              value={props.editedTitle}
              onChange={(e) =>
                props.onEditedTitleChange?.call(null, e.target.value)
              }
              onBlur={props.onEditTitleStart}
              onKeyPress={(e) => e.key === "Enter" && props.onSaveTitle()}
              autoFocus
              className="flex-1 px-2 py-1 bg-background border border-border rounded text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ) : (
            <motion.button
              whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
              //   onClick={() =>props. setIsEditingTitle(true)}
              className="flex-1 text-left px-2 py-1 rounded font-semibold text-sm"
            >
              {props.list.title}
            </motion.button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <span className="text-lg">⋮</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
              //   onClick={() => archiveList(boardId, list.id)}
              >
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem
                // onClick={() => deleteList(boardId, list.id)}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* List Stats */}
        <div className="text-xs text-muted-foreground">
          {completedCount}/{cardCount} completed
          {props.list.wipLimit && (
            <div
              className={
                cardCount > props.list.wipLimit
                  ? "text-destructive font-semibold"
                  : ""
              }
            >
              WIP Limit: {cardCount}/{props.list.wipLimit}
            </div>
          )}
        </div>
      </div>

      {/* Cards Container */}
      {props.isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 overflow-y-auto p-3 space-y-2"
        >
          <WithClientAnimatedPresence>
            {props.list.cards.map((card, index) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ListCardItem
                  card={card}
                  index={index}
                  listId={props.list.id}
                  boardId={props.boardId}
                />
              </motion.div>
            ))}
          </WithClientAnimatedPresence>

          {/* Add Card Button */}
          {props.isCreatingCard ? (
            <div className="bg-background rounded-lg p-3 space-y-2">
              <input
                type="text"
                placeholder="Card title..."
                value={props.newCardTitle}
                // onChange={(e) => setNewCardTitle(e.target.value)}
                // onKeyPress={(e) => e.key === "Enter" && handleCreateCard()}
                autoFocus
                className="w-full px-2 py-1 bg-card border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  // onClick={handleCreateCard}
                  className="flex-1"
                >
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  //   onClick={() => {
                  //     setIsCreatingCard(false);
                  //     setNewCardTitle("");
                  //   }}
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
              //   onClick={() => setIsCreatingCard(true)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:bg-background transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Card
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
