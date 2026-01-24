"use client";

import { useEffect } from "react";

import WithSettings from "@/components/settings/WithSettings";
import WithBoardView from "@/features/boards/components/BoardsView/WithBoardView";
import WithListView from "@/features/lists/components/WithListView";
import { useAppDispatch, useAppSelector } from "@/lib/App.hooks";
import { getMain } from "@/lib/AppMainSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const mainContent = useAppSelector(getMain);
  useEffect(() => {
    // dispatch(UpdateSection("content"));
  }, [dispatch]);

  return (
    <div className=" h-full ">
      {mainContent == "boards" && <WithBoardView />}
      {mainContent === "settings" && <WithSettings />}
      {mainContent === "lists" && <WithListView />}
    </div>
  );
}
