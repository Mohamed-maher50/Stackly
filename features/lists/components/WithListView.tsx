import useBoardLists from "@/features/boards/hooks/useBoardLists";
import { currentBoard } from "@/features/stores";
import { useAppSelector } from "@/lib/App.hooks";

import { IList } from "../types";
import ListsView from "./ListsView";

const WithListView = () => {
  const board = useAppSelector(currentBoard);
  const boardSelector = useBoardLists();
  const lists: IList[] = useAppSelector((state) =>
    board ? boardSelector(state, board?.id) : [],
  );
  return <ListsView lists={lists} />;
};

export default WithListView;
