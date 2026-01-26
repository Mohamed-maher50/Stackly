"use client";

import { useEffect } from "react";

import WithSettings from "@/components/settings/WithSettings";
import WithBoardView from "@/features/boards/components/BoardsView/WithBoardView";
import useBoardLists from "@/features/boards/hooks/useBoardLists";
import WithListView from "@/features/lists/components/WithListView";
import { useAppDispatch, useAppSelector } from "@/lib/App.hooks";
import { getMain } from "@/lib/AppMainSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const mainContent = useAppSelector(getMain);
  const sf = useBoardLists();

  // const s = useAppSelector((state) => sf(state, "maher"));
  useEffect(() => {
    // dispatch(UpdateSection("content"));
  }, [dispatch]);

  return (
    <div className=" h-full p-2 ">
      {mainContent == "boards" && <WithBoardView />}
      {mainContent === "settings" && <WithSettings />}
      {mainContent === "lists" && <WithListView />}
    </div>
  );
}
