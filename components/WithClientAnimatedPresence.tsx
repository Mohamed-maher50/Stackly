"use client";
import { AnimatePresence } from "motion/react";
import { FC, PropsWithChildren } from "react";

const WithClientAnimatedPresence: FC<PropsWithChildren> = ({ children }) => {
  return <AnimatePresence mode="popLayout">{children}</AnimatePresence>;
};

export default WithClientAnimatedPresence;
