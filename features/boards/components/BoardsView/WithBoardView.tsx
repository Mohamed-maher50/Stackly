import { useAppSelector } from "@/lib/App.hooks";

import { normalizedBoardsSelector } from "../../store/slice";
import BoardView from ".";

const WithBoardView = () => {
  const { active, archived } = useAppSelector(normalizedBoardsSelector);

  return <BoardView board={active} archivedBoard={archived} />;
};

export default WithBoardView;
