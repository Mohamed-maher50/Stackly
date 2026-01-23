import * as motion from "motion/react-client";

import { List } from "../types";
import ListCard from "./ListCard";

const ListsView = ({ lists }: { lists: List[] }) => {
  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden">
      <div className="inline-flex gap-4 p-6 min-h-full">
        {/* Render Lists */}
        {lists.map((list) => (
          <motion.div
            key={list.id}
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ListCard list={list} boardId={"list.boardId"} isExpanded />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ListsView;
