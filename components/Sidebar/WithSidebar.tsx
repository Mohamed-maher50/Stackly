"use client";

import { FC, PropsWithChildren } from "react";

import dummyCompactBoards from "@/features/boards/mocks/compactBoards.mock";

import { SidebarProvider } from "../ui/sidebar";
import Sidebar from ".";

const WithSidebar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <SidebarProvider>
        <Sidebar activeBoardId="" boards={dummyCompactBoards} currentPage="1" />
        {children}
      </SidebarProvider>
    </div>
  );
};

export default WithSidebar;
