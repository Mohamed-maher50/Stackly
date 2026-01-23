"use client";

import { useEffect } from "react";

import WithBoardView from "@/features/boards/components/BoardsView/WithBoardView";
import WithListView from "@/features/lists/components/WithListView";
import { useAppDispatch, useAppSelector } from "@/lib/App.hooks";
import { getMain } from "@/lib/AppMainSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const mainContent = useAppSelector(getMain);
  console.log(mainContent);
  useEffect(() => {
    // dispatch(UpdateSection("content"));
  }, [dispatch]);

  return (
    <div className="">
      {mainContent == "boards" && <WithBoardView />}
      {mainContent === "settings" && <>setting</>}
      {mainContent === "lists" && <WithListView />}
    </div>
  );
}
