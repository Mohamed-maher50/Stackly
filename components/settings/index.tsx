"use client";

import { Monitor, Moon, RotateCcw, Save, Sun } from "lucide-react";
import {
  div as MotionDiv,
  section as MotionSection,
} from "motion/react-client";

import { Button } from "@/components/ui/button";
import { Theme } from "@/features";

type SettingsViewProps = {
  theme: Theme;
  //   dragPreference: "smooth" | "normal";
  hasChanges: boolean;

  boardsCount: number;
  cardsCount: number;

  //   accentColors: AccentColor[];

  onThemeChange: (theme: Theme) => void;
  //   onAccentColorChange: (color: string) => void;
  //   onDragPreferenceChange: (value: "smooth" | "normal") => void;

  onSave: () => void;
  onDiscard: () => void;
  onReset: () => void;
};

export function SettingsView({
  theme,

  hasChanges,
  boardsCount,
  cardsCount,
  //   accentColors,
  onThemeChange,
  //   onDragPreferenceChange,
  onSave,
  onDiscard,
  onReset,
}: SettingsViewProps) {
  return (
    <div className="w-full h-full overflow-auto">
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-8">
          {/* Appearance */}
          <MotionSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>

            {/* Theme */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-muted-foreground mb-3">
                Theme
              </label>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: "light", label: "Light", Icon: Sun },
                  { id: "dark", label: "Dark", Icon: Moon },
                  { id: "system", label: "System", Icon: Monitor },
                ].map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => onThemeChange(id as Theme)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      theme === id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Accent color */}
            {/* <div>
              <label className="block text-sm font-medium text-muted-foreground mb-3">
                Accent Color
              </label>

              <div className="flex gap-3">
                {accentColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => onAccentColorChange(color.id)}
                    className={`w-10 h-10 rounded-full ${color.class} transition-all ${
                      accentColor === color.id
                        ? "ring-2 ring-offset-2 ring-foreground"
                        : "hover:scale-110"
                    }`}
                  />
                ))}
              </div>
            </div> */}
          </MotionSection>

          {/* Interactions */}
          {/* <MotionSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Interactions</h2>

            {(["smooth", "normal"] as const).map((pref) => (
              <label
                key={pref}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer"
              >
                <input
                  type="radio"
                  checked={dragPreference === pref}
                  onChange={() => onDragPreferenceChange(pref)}
                />
                <span className="text-sm font-medium capitalize">{pref}</span>
              </label>
            ))}
          </MotionSection> */}

          {/* Statistics */}
          <MotionSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Data Statistics</h2>

            <div className="grid grid-cols-2 gap-4">
              <Stat label="Total Boards" value={boardsCount} />
              <Stat label="Total Cards" value={cardsCount} />
            </div>
          </MotionSection>

          {/* Danger zone */}
          <MotionSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-destructive/5 border border-destructive/20 rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-destructive">
              Danger Zone
            </h2>

            <Button
              onClick={onReset}
              className="gap-2 bg-destructive hover:bg-destructive/90"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Data
            </Button>
          </MotionSection>
        </div>

        {hasChanges && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 flex gap-3"
          >
            <Button variant="outline" onClick={onDiscard}>
              Discard
            </Button>
            <Button onClick={onSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </MotionDiv>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-muted rounded-lg p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
