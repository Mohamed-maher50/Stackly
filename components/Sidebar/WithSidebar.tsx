"use client";

import { FC, PropsWithChildren } from "react";

import { useAppSelector } from "@/lib/App.hooks";

import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import Sidebar from ".";

const WithSidebar: FC<PropsWithChildren> = ({ children }) => {
  const boards = useAppSelector((sate) => sate.boardStore.boards);
  return (
    <div>
      <SidebarProvider>
        <Sidebar activeBoardId="" boards={boards} currentPage="1" />
        <SidebarInset className="overflow-hidden">
          <div className="flex-1 flex flex-col mx-auto p-6 w-full">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default WithSidebar;
