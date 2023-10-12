import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import RestaurantDetailPage from "./components/RestaurantDetailPage";
import RestaurantForm from "./components/RestaurantForm";
import RestaurantList from "./components/RestaurantList";
// import SamplePage from "./components/SamplePage";
// import UserProfile from "./components/UserProfile";
import TopRatedRestaurantList from "./components/TopRatedRestaurantList";
import Navbar from "./components/Navbar";
import MyPage from "./components/MyPage";
import CategoryRestaurantList from "./components/CategoryRestaurantList";
import jwt_decode from "jwt-decode";
import AdminRestaurantList from "./components/AdminRestaurantList";
import SearchList from "./components/SearchList";
import EditUserPage from "./components/EditUserPage";
import RoleUserList from "./components/RoleUserList";
import Home from "./components/Home";

// 권한에 따른 라우터 처리 하는 메소드
function ProtectedRoute({ element, userRole, requiredRole, redirectTo }) {
  return userRole === requiredRole ? element : <Navigate to={redirectTo} />;
}

function App() {
  // 접속 유저 확인
  const token = localStorage.getItem("refreshToken");
  let userRole = null;

  if (token != null) {
    const decoded = jwt_decode(token);
    userRole = decoded.role;
  }

  return (
    <div className="App">
      {/* min-h-screen: 최소 높이를 화면 높이로 설정합니다. */}
      {/* flex-grow: 가능한 모든 공간을 차지하도록 설정합니다. */}
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          {/* 테마 색상 칸 */}
          <div className="h-1.5 mb-2 bg-amber-400"></div>
          {/* <UserProfile /> */}
          <Router>
            <Navbar userRole={userRole} />
            <Routes>
              {/* 홈 */}
              <Route path="/" element={<Home />} />
              <Route
                path="/user/signup"
                element={
                  <ProtectedRoute
                    element={<RegisterPage />}
                    userRole={userRole}
                    requiredRole={null}
                    redirectTo="/"
                  />
                }
              />
              <Route
                path="/user/login"
                element={
                  <ProtectedRoute
                    element={<LoginPage />}
                    userRole={userRole}
                    requiredRole={null}
                    redirectTo="/"
                  />
                }
              />
              <Route
                path="/user/mypage"
                element={
                  <ProtectedRoute
                    element={<MyPage />}
                    userRole={userRole}
                    requiredRole="ROLE_USER"
                    redirectTo="/"
                  />
                }
              />
              <Route
                path="/user/edituser"
                element={
                  <ProtectedRoute
                    element={<EditUserPage />}
                    userRole={userRole}
                    requiredRole="ROLE_USER"
                    redirectTo="/"
                  />
                }
              />
              <Route path="/restaurant/list" element={<RestaurantList />} />
              <Route
                path="/restaurant/:id"
                element={<RestaurantDetailPage />}
              />
              <Route
                path="/restaurant/top"
                element={<TopRatedRestaurantList />}
              />
              <Route
                path="/restaurant/byCategory/:category"
                element={<CategoryRestaurantList />}
              />
              {/* 검색 결과 */}
              <Route path="/restaurant/search" element={<SearchList />} />
              <Route
                path="/admin/registerRestaurant"
                element={
                  <ProtectedRoute
                    element={<RestaurantForm />}
                    userRole={userRole}
                    requiredRole="ROLE_ADMIN"
                    redirectTo="/"
                  />
                }
              />
              <Route
                path="/admin/restaurantList"
                element={
                  <ProtectedRoute
                    element={<AdminRestaurantList />}
                    userRole={userRole}
                    requiredRole="ROLE_ADMIN"
                    redirectTo="/"
                  />
                }
              />
              <Route
                path="/admin/userList"
                element={
                  <ProtectedRoute
                    element={<RoleUserList />}
                    userRole={userRole}
                    requiredRole="ROLE_ADMIN"
                    redirectTo="/"
                  />
                }
              />
            </Routes>
          </Router>
        </div>
        {/* 푸터 */}
        <footer className="bg-white text-black py-2">
          <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
              <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2023{" "}
                <a href="https://flowbite.com/" class="hover:underline">
                  Fooeating™
                </a>
                . All Rights Reserved.
              </span>
              <div class="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 21 16"
                  >
                    <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                  </svg>
                  <span class="sr-only">Discord community</span>
                </a>
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 17"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only">Twitter page</span>
                </a>
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only">GitHub account</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
