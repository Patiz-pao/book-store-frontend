"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

export const useNavbar = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = () => {
    const username = Cookies.get("username");
    const role = Cookies.get("role");
    const token = Cookies.get("token");

    if (username && role && token) {
      setUsername(username);
      setRole(role);
      setToken(token);
    } else {
      setUsername(null);
      setRole(null);
      setToken(null);
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    Cookies.remove("role");
    Cookies.remove("token");
    Cookies.remove("username");
    setUsername(null);
    setRole(null);
    setToken(null);
    router.refresh();
    router.push("/login");
  };

  return { username, isLoading, pathname, checkAuth, handleLogout }
};
