import Sidebar from "./components/common/Sidebar/Sidebar";
import Topbar from "./components/common/Topbar/Topbar";
import Dashboard from "./pages/manager/Dashboard/Dashboard";



export default function App() {
  return (
    <div className="flex w-full h-screen bg-[#f5f7fa]">
      <Sidebar />

      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        <Topbar />
        <Dashboard />
      </div>
    </div>
  );
}
