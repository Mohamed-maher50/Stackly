"use client";

import easyMeshGradient, { linear } from "easy-mesh-gradient";
import { useEffect } from "react";
import tinygradient from "tinygradient";

import { selectListsByBoardId } from "@/features/lists/listSlice";
import { archiveBoard } from "@/features/stores";
import { useAppDispatch, useAppSelector } from "@/lib/App.hooks";

const modernColors = [
  "#FF6B6B",
  "#FFD93D",
  "#6A4C93",
  "#C0A9E2",
  "#4D96FF",
  "#00F5D4",
  "#FF6EC7",
  "#FF9F1C",
  "#00C9A7",
  "#92FE9D",
  "#F72585",
  "#7209B7",
];

export default function Home() {
  const dispatch = useAppDispatch();
  const sdfsd = useAppSelector((sate) => sate.boardStore.boards);
  const boards = useAppSelector(selectListsByBoardId("board-1"));
  useEffect(() => {
    dispatch(archiveBoard("board-1"));
  }, [dispatch]);

  return <div className="p-20 w-20">hello</div>;
}
