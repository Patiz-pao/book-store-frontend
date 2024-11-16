import React from "react";
import { User } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full shadow-md">
      <div className="bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold">Books Store</div>

            <div className="flex items-center gap-2">
              <User size={20} />
              <Link href="/login">เข้าสู่ระบบ</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-12">
            <ul className="flex space-x-8">
              <li>
                <Link href="/">หนังสือ</Link>
              </li>
              <li>
                <Link href="/">E-book</Link>
              </li>
              <li>
                <Link href="/">สินค้าไลฟ์สไตล์</Link>
              </li>
              <li>
                <Link href="/">ติดต่อเรา</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
