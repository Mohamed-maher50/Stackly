import { Archive, ChevronDown, Trash2 } from "lucide-react";
import * as motion from "motion/react-client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WithClientAnimatedPresence from "@/components/WithClientAnimatedPresence";

import { IList } from "../types";
import WithListRecords from "./WithListCards";
import WithNewRecord from "./WithNewRecord";
import WithRenameList from "./WithRenameList";

export interface ListColumnProps {
  list: IList;
  boardId: string;
  isExpanded: boolean;
}

export default function ListCard(props: ListColumnProps) {
  const cardCount = props.list.cards.length;
  const completedCount = props.list.cards.length;
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

          <WithRenameList
            initialTitle={props.list.title}
            onTitleSave={() => {}}
          />

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
            <WithListRecords listId={props.list.id} />
          </WithClientAnimatedPresence>

          {/* Add Card Button */}
          <WithNewRecord listId={props.list.id} />
        </motion.div>
      )}
    </motion.div>
  );
}
