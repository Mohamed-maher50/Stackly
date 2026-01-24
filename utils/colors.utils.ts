export const LIST_ACCENT_COLORS = [
  // Cool
  "bg-cyan-50 dark:bg-cyan-900",
  "bg-orange-50 dark:bg-orange-900",

  // Neutral
  "bg-neutral-50 dark:bg-neutral-900",
  "bg-sky-50 dark:bg-sky-900",

  // Warm
  "bg-red-50 dark:bg-red-900",
  "bg-green-50 dark:bg-green-900",

  // Cool
  "bg-indigo-50 dark:bg-indigo-900",
  "bg-amber-50 dark:bg-amber-900",

  // Neutral
  "bg-zinc-50 dark:bg-zinc-900",
  "bg-teal-50 dark:bg-teal-900",

  // Warm
  "bg-yellow-50 dark:bg-yellow-900",
  "bg-purple-50 dark:bg-purple-900",

  // Cool
  "bg-blue-50 dark:bg-blue-900",
  "bg-lime-50 dark:bg-lime-900",

  // Neutral / Accent
  "bg-emerald-50 dark:bg-emerald-900",
  "bg-fuchsia-50 dark:bg-fuchsia-900",

  // Warm
  "bg-pink-50 dark:bg-pink-900",
  "bg-violet-50 dark:bg-violet-900",

  // Final accent
  "bg-rose-50 dark:bg-rose-900",
];

export const AccentColorGenerator = () => {
  let counter = -1;
  return () => {
    counter++;
    const index = counter % LIST_ACCENT_COLORS.length;
    return LIST_ACCENT_COLORS[index];
  };
};
