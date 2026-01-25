"use client";

import { useTheme } from "next-themes";
import { useState } from "react";

import { Theme } from "@/features";
import { recordCount } from "@/features/records/recordSlice";
import { normalizedBoardsSelector } from "@/features/stores";
import { useAppDispatch, useAppSelector } from "@/lib/App.hooks";

import { SettingsView } from ".";

export default function WithSettings() {
  //   const [dragPreference, setDragPreference] = useState(settings.dragPreference);
  const [hasChanges, setHasChanges] = useState(false);
  const boards = useAppSelector(normalizedBoardsSelector);
  const numberOfRecords = useAppSelector(recordCount);
  const { setTheme, theme } = useTheme();

  const dispatch = useAppDispatch();
  return (
    <SettingsView
      theme={theme as Theme}
      hasChanges={hasChanges}
      boardsCount={boards.active.length}
      cardsCount={numberOfRecords}
      onThemeChange={(v) => {
        setTheme(v);

        setHasChanges(true);
      }}
      onSave={() => {}}
      onDiscard={() => setHasChanges(false)}
      onReset={() => {
        const result = confirm("are you sure you need rest app");
        if (!result) return;
        dispatch({
          type: "RESET_ALL_STATE",
        });
      }}
    />
  );
}
