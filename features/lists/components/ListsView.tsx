import * as motion from "motion/react-client";
import { useRef } from "react";

import { IList } from "../types";
import WithNewList from "./NewListForm/WithNewList";
import WithListCard from "./WithListCard";

const ListsView = ({ lists }: { lists: IList[] }) => {
  const LastItem = useRef<null | HTMLDivElement>(null);
  const onInsert = () => {
    if (LastItem.current) {
      setTimeout(() => {
        LastItem.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <div className="inline-flex gap-4 overflow-hidden overflow-x-auto scroll-snap-x snap-x scroll-snap-mandatory  w-full   h-full min-h-full">
      {/* Render Lists */}
      {lists.map((list) => (
        <motion.div
          key={list.id}
          layout
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="snap-start"
        >
          <WithListCard list={list} />
        </motion.div>
      ))}

      <WithNewList onInsert={onInsert} />
      <div ref={LastItem} />
    </div>
  );
};

export default ListsView;
