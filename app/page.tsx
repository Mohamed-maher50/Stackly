"use client";

import { useEffect } from "react";

import WithBoardView from "@/features/boards/components/BoardsView/WithBoardView";
import { archiveBoard } from "@/features/stores";
import { useAppDispatch } from "@/lib/App.hooks";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(archiveBoard("board-1"));
  }, [dispatch]);

  return (
    <div className="">
      <WithBoardView />
    </div>
  );
}
