"use client";

import { useState } from "react";

import { Theme } from "@/features";
import { recordCount } from "@/features/records/recordSlice";
import { normalizedBoardsSelector } from "@/features/stores";
import { useAppSelector } from "@/lib/App.hooks";

import { SettingsView } from ".";

export default function WithSettings() {
  const [theme, setTheme] = useState<Theme>("system");
  //   const [dragPreference, setDragPreference] = useState(settings.dragPreference);
  const [hasChanges, setHasChanges] = useState(false);
  const boards = useAppSelector(normalizedBoardsSelector);
  const numberOfRecords = useAppSelector(recordCount);

  return (
    <SettingsView
      theme={theme}
      //   dragPreference={dragPreference}
      hasChanges={hasChanges}
      boardsCount={boards.active.length}
      cardsCount={numberOfRecords}
      onThemeChange={(v) => {
        setTheme(v);
        setHasChanges(true);
      }}
      onSave={() => {}}
      onDiscard={() => setHasChanges(false)}
      onReset={() => {}}
    />
  );
}
