"use client";
import React, { useEffect } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavbar } from "@/hooks/navbar/navbar.hook";

const Navbar = () => {
  const { username, role, isLoading, pathname, checkAuth, handleLogout } =
    useNavbar();

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const loadingAuth = () => {
    if (isLoading) {
      return (
        <div className="w-24 flex items-center gap-2 px-3 py-1">
          <User size={20} />
        </div>
      );
    }

    if (username) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-green-700 px-3 py-1 rounded-md transition-colors">
            <User size={20} />
            <span>{username}</span>
            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-red-600"
              >
                <LogOut size={16} />
                <span>ออกจากระบบ</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Link
        href="/login"
        className="flex items-center gap-2 hover:bg-green-700 px-3 py-1 rounded-md transition-colors"
      >
        <User size={20} />
        <span>เข้าสู่ระบบ</span>
      </Link>
    );
  };

  const menuItems = [
    { label: "หนังสือ", href: "/" },
    { label: "E-book", href: "/" },
    { label: "สินค้าไลฟ์สไตล์", href: "/" },
  ];
  
  if (role === "admin") {
    menuItems.push({ label: "จัดการ", href: "/admin/home" });
  }

  return (
    <nav className="w-full shadow-md">
      <div className="bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold">Books Store</div>

            <div className="flex items-center gap-2">{loadingAuth()}</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-12">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-green-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
