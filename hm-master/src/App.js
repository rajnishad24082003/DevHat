import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import Regi from "./components/Regi/Regi";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import { ProfileProvider } from "./context/profile.context";

function App() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <BrowserRouter>
          <ProfileProvider>
            <Routes>
              <Route
                path="/signin"
                element={
                  <PublicRoute>
                    <LoginPage></LoginPage>
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignupPage></SignupPage>
                  </PublicRoute>
                }
              />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Regi></Regi>
                  </PrivateRoute>
                }
              ></Route>
            </Routes>
          </ProfileProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
