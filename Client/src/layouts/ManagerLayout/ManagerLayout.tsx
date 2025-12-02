// layouts/ManagerLayout/ManagerLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import Topbar from "../../components/common/Topbar/Topbar";
import TopBarWithSearch from "../../components/common/Topbar/TopBarWithSearch";

export default function ManagerLayout() {
  return (
    <div className="flex w-full h-screen bg-[#eef1f7]">
      <Sidebar />

      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        <TopBarWithSearch />
        {/* pt nhỏ hơn để sát topbar hơn một chút */}
        <main className="px-6 pt-4 pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
