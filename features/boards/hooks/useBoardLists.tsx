import { useMemo } from "react";

import { selectBoardsList } from "@/features/lists/store/slice";

const useBoardLists = () => {
  const boardSelector = useMemo(() => {
    return selectBoardsList();
  }, []);
  return boardSelector;
};

export default useBoardLists;
