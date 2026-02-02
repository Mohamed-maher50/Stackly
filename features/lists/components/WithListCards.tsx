import * as motion from "motion/react-client";

import WithListRecord from "../../cards/components/RecordCard/WithListRecord";
import { IList } from "../types";

export default function WithListRecords({ list }: { list: IList }) {
  return (
    <>
      {list.cards.map((record) => (
        <motion.div
          key={record.id}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <WithListRecord card={record} />
        </motion.div>
      ))}
    </>
  );
}
