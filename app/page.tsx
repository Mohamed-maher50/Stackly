"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import WithSettings from "@/components/settings/WithSettings";
import WithBoardView from "@/features/boards/components/BoardsView/WithBoardView";
import { fetchBoardsThunk } from "@/features/boards/store/thunks.api";
import WithListView from "@/features/lists/components/WithListView";
import { currentBoard } from "@/features/stores";
import { useAppDispatch, useAppSelector } from "@/lib/App.hooks";
import { getMain, UpdateSection } from "@/lib/AppMainSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const mainContent = useAppSelector(getMain);
  const board = useSelector(currentBoard);
  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);
  useEffect(() => {
    if (!board) dispatch(UpdateSection("boards"));
  }, [board, dispatch]);
  return (
    <div className=" h-full p-2 ">
      {mainContent == "boards" && <WithBoardView />}
      {mainContent === "settings" && <WithSettings />}
      {mainContent === "lists" && <WithListView />}
    </div>
  );
}
