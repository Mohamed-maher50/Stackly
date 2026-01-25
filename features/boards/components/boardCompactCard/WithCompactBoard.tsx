import { useAppDispatch, useAppSelector } from "@/lib/App.hooks";
import { UpdateSection } from "@/lib/AppMainSlice";

import { updateActiveBoard } from "../../boardSlice";
import useBoardLists from "../../hooks/useBoardLists";
import { CompactBoard } from "../../types";
import CompactBoardCard from ".";

const WithCompactBoard = ({
  board,
  isActive,
}: {
  board: CompactBoard;
  isActive: boolean;
}) => {
  const dispatch = useAppDispatch();
  const boardSelector = useBoardLists();
  const onBoardClick = () => {
    dispatch(updateActiveBoard(board.id));
    dispatch(UpdateSection("lists"));
  };
  const lists = useAppSelector((state) => boardSelector(state, board.id));

  return (
    <div>
      <CompactBoardCard
        key={board.id}
        board={board}
        isActive={isActive}
        cardCount={lists.length}
        onClick={onBoardClick}
      />
    </div>
  );
};

export default WithCompactBoard;
