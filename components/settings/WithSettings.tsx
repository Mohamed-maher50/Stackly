"use client";

import { useTheme } from "next-themes";
import { useState } from "react";

import { Theme } from "@/features";
import { restApp } from "@/features/api";
import {
  cardsNumberSelector,
  normalizedBoardsSelector,
} from "@/features/stores";
import { useAppDispatch, useAppSelector } from "@/lib/App.hooks";

import { SettingsView } from ".";

export default function WithSettings() {
  const [hasChanges, setHasChanges] = useState(false);
  const boards = useAppSelector(normalizedBoardsSelector);
  const { setTheme, theme } = useTheme();
  const [previousTheme, setPreviousTheme] = useState(theme);
  const totalCards = useAppSelector(cardsNumberSelector);

  const dispatch = useAppDispatch();

  const onReset = async () => {
    const result = await restApp();
    if (result) {
      dispatch({
        type: "RESET_ALL_STATE",
      });
      localStorage.clear();
    } else alert("error");
  };
  return (
    <SettingsView
      theme={theme as Theme}
      hasChanges={hasChanges}
      boardsCount={boards.active.length}
      cardsCount={totalCards}
      onThemeChange={(v) => {
        setTheme(v);
        setHasChanges(true);
      }}
      onSave={() => {
        setHasChanges(false);
        setPreviousTheme(theme);
      }}
      onDiscard={() => {
        setHasChanges(false);
        setTheme(previousTheme as Theme);
      }}
      onReset={() => {
        const result = confirm("are you sure you need rest app");
        if (!result) return;
        onReset();
      }}
    />
  );
}
