import { useCallback, useState } from "react";

import { updateRecord } from "@/features/records/recordSlice";
import { useAppDispatch } from "@/lib/App.hooks";

import { IRecord } from "../types";
import ListCardItem from "./ListItemCard";
import WithRecordDetailModal from "./RecordDetailModel/WithRecordDetailModal";

const WithListRecord = ({ record }: { record: IRecord }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useAppDispatch();
  const onDoneToggle = useCallback(
    (status: boolean) => {
      dispatch(
        updateRecord({ id: record.id, done: status, listId: record.listId }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, record.id],
  );

  return (
    <>
      <ListCardItem
        card={record}
        onDoneToggle={onDoneToggle}
        onClick={() => setShowDetails(true)}
      />
      {/* Card Detail Modal */}
      {showDetails && (
        <WithRecordDetailModal
          card={record}
          onClose={() => {
            setShowDetails(false);
          }}
        />
      )}
    </>
  );
};

export default WithListRecord;
