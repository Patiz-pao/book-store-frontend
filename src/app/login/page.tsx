"use client";

import { useLogin } from "@/hooks/login/login.hook";

export default function Login() {
  const { loading, errors, error, handleSubmit, onSubmitLogin, register } =
    useLogin();

  return (
    <div className="container mx-auto max-w-md p-6 mt-10 shadow-lg rounded bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">เข้าสู่ระบบ</h1>

      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-2"
          >
            ชื่อผู้ใช้งาน
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            className={`w-full px-4 py-2 border rounded focus:outline-none ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            รหัสผ่าน
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className={`w-full px-4 py-2 border rounded focus:outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white py-2 px-4 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loading ? "กำลังโหลด..." : "เข้าสู่ระบบ"}
          </button>
        </div>
      </form>
    </div>
  );
}
