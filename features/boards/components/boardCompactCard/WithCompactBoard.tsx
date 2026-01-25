import { selectListsByBoardId } from "@/features/lists/listSlice";
import { useAppDispatch, useAppSelector } from "@/lib/App.hooks";
import { UpdateSection } from "@/lib/AppMainSlice";

import { updateActiveBoard } from "../../boardSlice";
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
  const onBoardClick = () => {
    dispatch(updateActiveBoard(board.id));
    dispatch(UpdateSection("lists"));
  };
  console.log(board.id);
  const lists = useAppSelector(selectListsByBoardId(board.id));
  console.log(lists);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getBoardCardCount = (_board: CompactBoard) => {
    return 5;
  };
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
