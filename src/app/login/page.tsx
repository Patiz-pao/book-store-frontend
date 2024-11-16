"use client";
import { useLogin } from "@/hooks/login/login.hook";

export default function Login() {
  const {
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
  } = useLogin();

  return (
    <div className="container mx-auto max-w-md p-6 mt-10 shadow-lg rounded bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
      </h1>

      <form onSubmit={
        isRegister 
          ? handleRegisterSubmit(onSubmitRegister)
          : handleLoginSubmit(onSubmitLogin)
      }>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            ชื่อผู้ใช้งาน
          </label>
          <input
            id="username"
            type="text"
            {...(isRegister ? registerFormRegister("username") : loginFormRegister("username"))}
            className={`w-full px-4 py-2 border rounded focus:outline-none ${
              (isRegister ? registerErrors.username : loginErrors.username) 
                ? "border-red-500" 
                : "border-gray-300"
            }`}
          />
          {isRegister 
            ? registerErrors.username && (
                <span className="text-red-500 text-sm">
                  {registerErrors.username.message}
                </span>
              )
            : loginErrors.username && (
                <span className="text-red-500 text-sm">
                  {loginErrors.username.message}
                </span>
              )
          }
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            รหัสผ่าน
          </label>
          <input
            id="password"
            type="password"
            {...(isRegister ? registerFormRegister("password") : loginFormRegister("password"))}
            className={`w-full px-4 py-2 border rounded focus:outline-none ${
              (isRegister ? registerErrors.password : loginErrors.password)
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {isRegister
            ? registerErrors.password && (
                <span className="text-red-500 text-sm">
                  {registerErrors.password.message}
                </span>
              )
            : loginErrors.password && (
                <span className="text-red-500 text-sm">
                  {loginErrors.password.message}
                </span>
              )
          }
        </div>

        {isRegister && (
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              กรอกรหัสผ่านอีกครั้ง
            </label>
            <input
              id="confirmPassword" 
              type="password"
              {...registerFormRegister("confirmPassword")}
              className={`w-full px-4 py-2 border rounded focus:outline-none ${
                passwordMatchError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {passwordMatchError && (
              <span className="text-red-500 text-sm">{passwordMatchError}</span>
            )}
          </div>
        )}

        {error && (
          <div className={`text-sm mb-4 ${error.includes("สำเร็จ") ? "text-green-500" : "text-red-500"}`}>
            {error}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white py-2 px-4 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loading
              ? "กำลังโหลด..."
              : isRegister
              ? "สมัครสมาชิก"
              : "เข้าสู่ระบบ"}
          </button>

          <div className="py-2">
            <div className="w-full border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
            }}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            {isRegister ? "กลับไปเข้าสู่ระบบ" : "สมัครสมาชิก"}
          </button>
        </div>
      </form>
    </div>
  );
}