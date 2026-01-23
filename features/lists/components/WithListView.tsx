import { useAppSelector } from "@/lib/App.hooks";

import { selectActiveBoardLists } from "../listSlice";
import ListsView from "./ListsView";

const WithListView = () => {
  const lists = useAppSelector(selectActiveBoardLists);
  return <ListsView lists={lists} />;
};

export default WithListView;
