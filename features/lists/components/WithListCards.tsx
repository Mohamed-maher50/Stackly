import * as motion from "motion/react-client";

import { selectListRecords } from "@/features/records/recordSlice";
import { useAppSelector } from "@/lib/App.hooks";

import ListCardItem from "./ListItemCard";

export default function WithListRecords({ listId }: { listId: string }) {
  const cards = useAppSelector((state) => selectListRecords(state, listId));
  return (
    <>
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <ListCardItem card={card} index={index} />
        </motion.div>
      ))}
    </>
  );
}
