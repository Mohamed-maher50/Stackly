import { CompactBoard } from "../../types";
import CompactBoardCard from ".";

const WithCompactBoard = ({
  board,
  isActive,
}: {
  board: CompactBoard;
  isActive: boolean;
}) => {
  const onBoardClick = () => {};
  const getBoardCardCount = (board: CompactBoard) => {
    return 5;
  };
  return (
    <div>
      <CompactBoardCard
        key={board.id}
        board={board}
        isActive={isActive}
        cardCount={getBoardCardCount(board)}
        onClick={onBoardClick}
      />
    </div>
  );
};

export default WithCompactBoard;
