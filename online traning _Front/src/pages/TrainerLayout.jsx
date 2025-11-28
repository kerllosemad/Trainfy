import { Outlet } from "react-router-dom";
import TrainerSidebar from "../components/TrainerSidebar";

export default function TrainerLayout() {
  return (
    <div style={{ display: "flex" }}>
      {/* سايدبار المدرب */}
      <TrainerSidebar />

      {/* المحتوى */}
      <div style={{ flex: 1, backgroundColor: "#000", minHeight: "100vh" }}>
        <Outlet />
      </div>
    </div>
  );
}
