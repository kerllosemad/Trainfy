import { Routes, Route } from "react-router-dom";

// صفحات عامة
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";

// Layouts
import TraineeLayout from "./pages/TraineeLayout";
import TrainerLayout from "./pages/TrainerLayout";

// صفحات المتدرب
import TraineeDashboard from "./pages/TraineeDashboard";
import TraineeProfile from "./pages/TraineeProfile";
import TraineeCourses from "./pages/TraineeCourses";
import SportsPage from "./pages/SportsPage";
import SportDetail from "./pages/SportDetails.jsx";
import BookingForm from "./pages/BookingForm";

// صفحات المدرب
import TrainerDashboard from "./pages/TrainerDashboard";
import TrainerTrainees from "./pages/TrainerTrainees";
import TrainerProfile from "./pages/TrainerProfile";
import TrainerMyWork from "./pages/TrainerMyWork";
import TrainerCourseForm from "./pages/TrainerCourseForm";
import TrainerCourses from "./pages/TrainerCourses"; // ✅ الإضافة الجديدة

// صفحات الأدمن
import AdminDashboard from "./pages/AdminDashboard";
import UsersReport from "./pages/UsersReport";

// صفحات أخرى
import AboutUs from "./pages/AboutUs";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      {/* صفحات عامة */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* مسارات المتدرب */}
      <Route path="/trainee" element={<TraineeLayout />}>
        <Route index element={<SportsPage mode="trainee" />} />
        <Route path="home" element={<TraineeDashboard />} />
        <Route path="profile" element={<TraineeProfile />} />
        <Route path="courses" element={<TraineeCourses />} />
        <Route path="sports" element={<SportsPage mode="trainee" />} />
        <Route path="sport/:sportName" element={<SportDetail />} />
        <Route path="sport/:sportName/book" element={<BookingForm />} />
      </Route>

      {/* مسارات المدرب */}
      <Route path="/trainer" element={<TrainerLayout />}>
        <Route index element={<SportsPage mode="trainer" />} />
        <Route path="home" element={<TrainerDashboard />} />
        <Route path="sports" element={<SportsPage mode="trainer" />} />
        <Route path="courses" element={<TrainerCourses />} /> {/* ✅ Route جديد */}
        <Route path="trainees" element={<TrainerTrainees />} />
        <Route path="profile" element={<TrainerProfile />} />
        <Route path="my-work" element={<TrainerMyWork />} />
        <Route path="course/:sportName" element={<TrainerCourseForm />} />
      </Route>

      {/* مسارات الأدمن */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin/reports" element={<UsersReport />} />

      {/* صفحات أخرى */}
      <Route path="/about" element={<AboutUs from="general" />} />
      <Route path="/about-us" element={<AboutUs from="general" />} /> {/* ✅ Route إضافي علشان يشتغل مع الزرارين */}
    </Routes>
  );
}

export default App;
