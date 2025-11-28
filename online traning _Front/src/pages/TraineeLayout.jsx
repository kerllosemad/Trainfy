import { Outlet } from "react-router-dom";
import TraineeSidebar from "../components/TraineeSidebar";

export default function TraineeLayout() {
  return (
    <div style={{ display: "flex" }}>
      {/* سايدبار المتدرب */}
      <TraineeSidebar />

      {/* المحتوى */}
      <div style={{ flex: 1, backgroundColor: "#000", minHeight: "100vh" }}>
        <Outlet />
      </div>
    </div>
  );
}
