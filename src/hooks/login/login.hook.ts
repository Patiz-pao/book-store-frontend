"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  type LoginForm = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitLogin = async (data: LoginForm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, role, username } = data.data;

        Cookies.set("token", token, { expires: 1 / 24 });
        Cookies.set("role", role, { expires: 1 / 24 });
        Cookies.set("username", username, { expires: 1 / 24 });

        // Cookies.set("token", token, { expires: 10 / (24 * 60 * 60) }); // 10 วินาที
        // Cookies.set("role", role, { expires: 10 / (24 * 60 * 60) }); // 10 วินาที

        if (data.data.role === "admin") {
          router.push("/admin/home");
        } else {
          router.push("/home");
        }
      } else {
        setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, error, handleSubmit, onSubmitLogin, register };
};
