"use client";

import { FC, PropsWithChildren } from "react";

import { useAppSelector } from "@/lib/App.hooks";

import { SidebarProvider } from "../ui/sidebar";
import Sidebar from ".";

const WithSidebar: FC<PropsWithChildren> = ({ children }) => {
  const boards = useAppSelector((sate) => sate.boardStore.boards);
  return (
    <div>
      <SidebarProvider>
        <Sidebar activeBoardId="" boards={boards} currentPage="1" />
        {children}
      </SidebarProvider>
    </div>
  );
};

export default WithSidebar;
