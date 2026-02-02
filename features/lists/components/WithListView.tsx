import { useEffect } from "react";

import useBoardLists from "@/features/boards/hooks/useBoardLists";
import { currentBoard } from "@/features/stores";
import { useAppDispatch, useAppSelector } from "@/lib/App.hooks";

import { fetchListsThunk } from "../store/thunks.api";
import { IList } from "../types";
import ListsView from "./ListsView";

const WithListView = () => {
  const board = useAppSelector(currentBoard);
  const boardSelector = useBoardLists();
  const dispatch = useAppDispatch();
  const lists: IList[] = useAppSelector((state) =>
    board ? boardSelector(state, board?.id) : [],
  );
  useEffect(() => {
    if (!board) return;
    dispatch(fetchListsThunk(board.id));
  }, [dispatch, board]);
  return <ListsView lists={lists} />;
};

export default WithListView;
