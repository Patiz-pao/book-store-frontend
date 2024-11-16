"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LoginResponse, RegisterResponse } from "@/Types/login-register/types";

const registerSchema = z.object({
  username: z.string().min(1, "กรุณากรอกชื่อผู้ใช้"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
  confirmPassword: z.string().min(1, "กรุณายืนยันรหัสผ่าน"),
});

const loginSchema = z.object({
  username: z.string().min(1, "กรุณากรอกชื่อผู้ใช้"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
});

type RegisterForm = z.infer<typeof registerSchema>;
type LoginForm = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const {
    register: registerFormRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegisterForm,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const {
    register: loginFormRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLoginForm,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitRegister = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      setPasswordMatchError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    setPasswordMatchError("");
    setLoading(true);
    setError(null);

    try {
      const requestBody = {
        customerid: "string",
        username: data.username,
        password: data.password,
        role: "string",
      };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        const result: RegisterResponse = await response.json();
        setIsRegister(false);
        resetRegisterForm();
        setError("สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "ไม่สามารถสมัครสมาชิกได้");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitLogin = async (data: LoginForm) => {
    setLoading(true);
    setError(null);

    try {
      const requestBody = {
        username: data.username,
        password: data.password,
      };

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result: LoginResponse = await response.json();
        resetLoginForm();
        const { token, role, username } = result.data;

        Cookies.set("token", token, { expires: 1 / 24 });
        Cookies.set("role", role, { expires: 1 / 24 });
        Cookies.set("username", username, { expires: 1 / 24 });

        if (role === "admin") {
          router.push("/admin/home");
        } else {
          router.push("/home");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    registerErrors,
    loginErrors,
    error,
    setError,
    handleRegisterSubmit,
    handleLoginSubmit,
    onSubmitLogin,
    onSubmitRegister,
    registerFormRegister,
    loginFormRegister,
    setIsRegister,
    isRegister,
    passwordMatchError,
  };
};
