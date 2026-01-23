import { useAppSelector } from "@/lib/App.hooks";

import { normalizedBoardsSelector } from "../../boardSlice";
import BoardView from ".";

const WithBoardView = () => {
  const { active, archived } = useAppSelector(normalizedBoardsSelector);

  return <BoardView board={active} archivedBoard={archived} />;
};

export default WithBoardView;
