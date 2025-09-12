import React, { useContext } from "react";
import { Bell, LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { ThemeContext } from "./the-context";

const Navbar = () => {
  const useTheme = () => useContext(ThemeContext);
    const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-background/40 sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) md:rounded-tl-xl md:rounded-tr-xl">
      {/* LEFT */}
      <SidebarTrigger/>
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2">
      <div className="lg:flex-1">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>Feature</span>
          <span className="text-gray-400">/</span>
          <span>Sub Task</span>
        </div>
      </div>
      {/* RIGHT */}
   <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
          {theme === "dark" ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
        <Settings className="w-4 h-4 cursor-pointer" />
        <Avatar className="cursor-pointer sm:inline-flex hidden">
  <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
      </div>

    </header>
  );
};

export default Navbar;