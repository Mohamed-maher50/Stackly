import { AccentColorGenerator } from "@/utils/colors.utils";

export const accentColors = AccentColorGenerator();
// export const getInitialList = (boardId: string): Omit<IList, "title"> => {
//   return {
//     id: uuidv4(),
//     accentColor: accentColors(),
//     archived: false,
//     boardId,
//     cards: [],
//     createdAt: new Date().toISOString(),
//     order: 0,
//     wipLimit: Infinity,
//   };
// };
