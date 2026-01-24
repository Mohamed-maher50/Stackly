import { useState } from "react";

import { useAppDispatch } from "@/lib/App.hooks";

import { archiveList, deleteList } from "../listSlice";
import { IList } from "../types";
import ListCard from "./ListCard";

interface WithListCardProps {
  list: IList;
}
const WithListCard = ({ list }: WithListCardProps) => {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const onArchiveList = (listId: string) => dispatch(archiveList(listId));
  const onDeleteList = (listId: string) => dispatch(deleteList(listId));

  return (
    <ListCard
      list={list}
      boardId={list.boardId}
      isExpanded={isExpanded}
      onArchiveList={onArchiveList}
      onDeleteList={onDeleteList}
      onExpended={setIsExpanded}
    />
  );
};

export default WithListCard;
