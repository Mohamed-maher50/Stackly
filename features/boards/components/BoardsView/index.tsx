import * as motion from "motion/react-client";

import { Board } from "../../types";
import WithBoardCard from "../boardCard/WithBoardCard";

interface BoardsViewProps {
  board: Board[];
  archivedBoard: Board[];
  onSelectBoard?: (boardId: string) => void;
}

const BoardView = ({
  board,
  archivedBoard,
  onSelectBoard,
}: BoardsViewProps) => {
  return (
    <div className="w-full  h-full overflow-auto">
      <div className="p-8">
        {/* Active Boards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your Boards</h2>

          {board.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No boards yet. Create your first board to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {board.map((board, index) => (
                <motion.div
                  key={board.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onSelectBoard?.call(null, board.id)}
                >
                  <WithBoardCard
                    stats={{
                      completedCards: 1,
                      overdueCards: 5,
                      totalCards: 10,
                    }}
                    board={board}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Archived Boards */}
        {archivedBoard.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-muted-foreground">
              Archived Boards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 opacity-60">
              {archivedBoard.map((board) => (
                <motion.div key={board.id} whileHover={{ y: -2 }}>
                  <WithBoardCard
                    stats={{
                      completedCards: 1,
                      overdueCards: 5,
                      totalCards: 10,
                    }}
                    board={board}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardView;
