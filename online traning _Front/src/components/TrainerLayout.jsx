import { Outlet } from "react-router-dom";
import TrainerSidebar from "../components/TrainerSidebar";

export default function TrainerLayout() {
  return (
    <div style={{ display: "flex" }}>
      <TrainerSidebar />   {/* سايدبار المدرب */}
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />         {/* هنا الصفحات تتغير */}
      </main>
    </div>
  );
}
