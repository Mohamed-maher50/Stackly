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
        cardCount={getBoardCardCount(board)}
        onClick={onBoardClick}
      />
    </div>
  );
};

export default WithCompactBoard;
