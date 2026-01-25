import { useMemo } from "react";

import { selectBoardsList } from "@/features/lists/listSlice";

const useBoardLists = () => {
  const boardSelector = useMemo(() => {
    return selectBoardsList();
  }, []);
  return boardSelector;
};

export default useBoardLists;
