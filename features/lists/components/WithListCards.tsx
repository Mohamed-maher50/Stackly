import * as motion from "motion/react-client";

import { selectListRecords } from "@/features/records/recordSlice";
import { useAppSelector } from "@/lib/App.hooks";

import WithListRecord from "./WithListRecord";

export default function WithListRecords({ listId }: { listId: string }) {
  const records = useAppSelector((state) => selectListRecords(state, listId));

  return (
    <>
      {records.map((record) => (
        <motion.div
          key={record.id}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <WithListRecord record={record} />
        </motion.div>
      ))}
    </>
  );
}
