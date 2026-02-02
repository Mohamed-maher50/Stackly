import { useState } from "react";

import { useAppDispatch } from "@/lib/App.hooks";

import { deleteListThunk, updateListThunk } from "../store/thunks.api";
import { IList } from "../types";
import ListCard from "./ListCard";

interface WithListCardProps {
  list: IList;
}
const WithListCard = ({ list }: WithListCardProps) => {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const onArchiveList = (listId: string) =>
    dispatch(
      updateListThunk({
        id: listId,
        boardId: list.boardId,
        archived: true,
      }),
    );
  const onDeleteList = () => {
    dispatch(deleteListThunk(list));
  };

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
