"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <nav className=" text-white shadow-md ">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo / Home Link */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold hover:text-gray-300 transition"
          onClick={() =>
            showNotification("Welcome to ImageKit ReelsPro", "info")
          }
        >
          <Home className="w-6 h-6" />
          <span>ImageKit ReelsPro</span>
        </Link>

        {/* Profile Section */}
        <div className="relative">
          {/* Profile Button */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-[#0d0d0d] px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <User className="w-5 h-5" />
            <span>{session?.user?.email?.split("@")[0] || "Guest"}</span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#0d0d0d]rounded-lg shadow-lg ">
              <ul className="py-2 text-sm text-gray-300">
                {session ? (
                  <>
                    <li className="px-4 py-2 text-gray-400 border-b border-gray-700">
                      {session.user?.email}
                    </li>
                    <li>
                      <Link
                        href="/upload"
                        className="block px-4 py-2 hover:bg-gray-700 transition"
                        onClick={() =>
                          showNotification("Welcome to Admin Dashboard", "info")
                        }
                      >
                        📤 Video Upload
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition"
                      >
                        🚪 Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      className="block px-4 py-2 hover:bg-gray-700 transition"
                      onClick={() =>
                        showNotification("Please sign in to continue", "info")
                      }
                    >
                      🔐 Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
