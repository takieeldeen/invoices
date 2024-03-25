import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";

function AppLayout() {
  return (
    <main className="flex h-screen min-h-[35rem] flex-col  bg-neutral-200 dark:bg-dark md:flex-row">
      <Sidebar />
      <Outlet />
    </main>
  );
}

export default AppLayout;
