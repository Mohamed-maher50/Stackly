import { useCallback } from "react";

import { updateRecord } from "@/features/records/recordSlice";
import { useAppDispatch } from "@/lib/App.hooks";

import { IRecord } from "../types";
import ListCardItem from "./ListItemCard";

const WithListRecord = ({ record }: { record: IRecord }) => {
  const dispatch = useAppDispatch();
  const onDoneToggle = useCallback(
    (status: boolean) => {
      dispatch(updateRecord({ id: record.id, done: status }));
    },
    [dispatch, record.id],
  );

  return <ListCardItem card={record} onDoneToggle={onDoneToggle} />;
};

export default WithListRecord;
