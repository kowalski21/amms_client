import { useLayoutStore } from "@/stores/layout";
import { useRouter } from "next/router";
import React from "react";
import AvatarSidebar from "./AvatarSidebar";
import Link from "next/link";
// import { ListInlineItem } from "reactstrap";
import { useAuthStore } from "@/stores/auth";
const AppSidebar = () => {
  const user = useAuthStore((state) => state.user);
  const layoutState = useLayoutStore((state) => state.close);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push(`/auth/login`);
  };
  return (
    <aside className="sidebar-left border-right  shadow">
      <nav class="vertnav navbar navbar-light">
        {layoutState ? (
          <div class="w-100 mb-4 mt-5 d-flex flex-column flex-end">
            <a class="navbar-brand mx-auto mt-2 flex-fill text-center">
              <img
                className="img-fluid"
                style={{
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  objectFit: "cover",
                }}
                src={`/avatar.jpg`}
                alt=""
              />
            </a>
            {/* <p className="text-center mt-2">Username: Kowalski</p>
            <p className="text-center">Role : Administrator</p> */}

            <a class="nav-link sc" onClick={handleLogout}>
              <i className="fe fe-log-out"></i>
            </a>
          </div>
        ) : (
          <AvatarSidebar user={user} />
        )}
        <ul class="navbar-nav flex-fill w-100 mb-2">
          <li class="nav-item dropdown sc">
            <Link href={`/`} legacyBehavior>
              <a class="nav-link">
                <i class="fe fe-home fe-16"></i>
                <span class="ml-3 item-text">Home</span>
              </a>
            </Link>
          </li>
        </ul>

        <ul class="navbar-nav flex-fill w-100 mb-2">
          <li class="nav-item dropdown">
            <Link href={`/dashboard/clients`} legacyBehavior>
              <a class="nav-link">
                <i class="fe fe-users fe-16"></i>
                <span class="ml-3 item-text">Ministers & Wives</span>
              </a>
            </Link>
          </li>
        </ul>
        {["Administrator"].includes(user.role.name) && (
          <ul class="navbar-nav flex-fill w-100 mb-2">
            <li class="nav-item dropdown">
              <Link href={`/dashboard/areas`} legacyBehavior>
                <a class="nav-link">
                  <i class="fe fe-archive fe-16"></i>
                  <span class="ml-3 item-text">Areas</span>
                </a>
              </Link>
            </li>
          </ul>
        )}
        <ul class="navbar-nav flex-fill w-100 mb-2">
          <li class="nav-item dropdown">
            <Link href={`/dashboard/reports`} legacyBehavior>
              <a class="nav-link sc">
                <i class="fe fe-bar-chart-2 fe-16"></i>
                <span class="ml-3 item-text">Medical Reports</span>
              </a>
            </Link>
          </li>
        </ul>
        {/* <ul class="navbar-nav flex-fill w-100 mb-2">
          <li class="nav-item dropdown">
            <a class="nav-link sc">
              <i class="fe fe-cloud-lightning fe-16"></i>
              <span class="ml-3 item-text">Dashboards</span>
            </a>
          </li>
        </ul> */}
        {["Administrator"].includes(user.role.name) && (
          <ul class="navbar-nav flex-fill w-100 mb-2">
            <li class="nav-item dropdown">
              <Link href={`/dashboard/users`} legacyBehavior>
                <a class="nav-link sc">
                  <i class="fe fe-git-merge fe-16"></i>
                  <span class="ml-3 item-text">Users</span>
                </a>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </aside>
  );
};

export default AppSidebar;
