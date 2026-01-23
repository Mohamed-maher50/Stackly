"use client";

import { ArrowLeft, Menu, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/App.hooks";
import { UpdateSection } from "@/lib/AppMainSlice";

import { SidebarTrigger } from "../ui/sidebar";

interface HeaderProps {
  currentPage: string;
}

export default function AppNavbar({ currentPage }: HeaderProps) {
  const dispatch = useAppDispatch();
  return (
    <header className="border-b border-border  bg-card h-16 w-full flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="">
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <Menu className="w-5 h-5" />
          </Button>
        </SidebarTrigger>

        {currentPage === "board-detail" && (
          <Button
            variant="ghost"
            size="sm"
            // onClick={onNavigateToBoards}
            className="gap-2 hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        )}

        <div>
          {currentPage === "boards" && (
            <h1 className="text-xl font-bold">My Boards</h1>
          )}
          {/* {currentPage === "board-detail" && currentBoard && (
            <h1 className="text-xl font-bold">{currentBoard.title}</h1>
          )} */}
          {currentPage === "settings" && (
            <h1 className="text-xl font-bold">Settings</h1>
          )}
        </div>
      </div>

      <div className="flex ml-auto items-center gap-2">
        {currentPage !== "settings" && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(UpdateSection("settings"))}
            className="hover:bg-muted"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </Button>
        )}
      </div>
    </header>
  );
}
