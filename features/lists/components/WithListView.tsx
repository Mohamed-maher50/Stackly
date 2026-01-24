import { currentBoard } from "@/features/stores";
import { useAppSelector } from "@/lib/App.hooks";

import { selectListsByBoardId } from "../listSlice";
import { IList } from "../types";
import ListsView from "./ListsView";

const WithListView = () => {
  const board = useAppSelector(currentBoard);
  const lists: IList[] = useAppSelector(
    board ? selectListsByBoardId(board.id) : () => [],
  );
  return <ListsView lists={lists} />;
};

export default WithListView;
