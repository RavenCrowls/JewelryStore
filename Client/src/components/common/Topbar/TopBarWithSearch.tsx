// src/components/common/Topbar/Topbar.tsx
import { useNavigate } from "react-router-dom";
import { Search, LogOut, Bell } from "lucide-react";
import { AuthService } from "../../../services";
import { useDisplayName } from "../../../hooks/useDisplayName";
import { useUserAvatar } from "../../../hooks/useUserAvatar";

export default function TopBarWithSearch() {
  const navigate = useNavigate();
  const displayName = useDisplayName();
  const avatarUrl = useUserAvatar();
  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="w-full px-6 py-3 flex items-center justify-between bg-white">
      {/* Search bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-lg border border-transparent bg-[#F3F7FC] px-4 py-2 pr-9 text-xs text-slate-600 placeholder:text-slate-400 outline-none focus:border-[#1279C3] focus:bg-white"
          />
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
            {/* icon kính lúp */}
            <Search className="h-4 w-4" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"
            />
          </span>
        </div>
      </div>

      {/* Right side: avatar + username + logout + bell */}
      <div className="ml-4 flex items-center gap-4">
        {/* Avatar + username */}
        <div className="flex items-center gap-2">
          <img src={avatarUrl || "/img/avt.png"} alt="Avatar" className="h-8 w-8 rounded-full object-cover" />
          <span className="text-xs font-medium text-slate-600">{displayName || "Account"}</span>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#DDE4F0] text-[#1279C3] hover:bg-[#1279C3]/5"
          title="Logout"
        >
          {/* icon logout đơn giản */}
          <LogOut className="h-4 w-4" />
        </button>

        {/* Notification bell */}
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#DDE4F0] text-[#1279C3] hover:bg-[#1279C3]/5"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
