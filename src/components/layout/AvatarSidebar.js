import { useNotify } from "@/hooks/notify";
import { useRouter } from "next/router";
import React from "react";

const AvatarSidebar = ({ user }) => {
  const router = useRouter();
  const { showMsg } = useNotify();
  const handleLogout = () => {
    localStorage.clear();
    showMsg(`LOGOUT SUCCESS`);
    router.push(`/auth/login`);
  };
  return (
    <div class="w-100 mb-4 mt-5 d-flex flex-column flex-end">
      <a class="navbar-brand mx-auto mt-2 flex-fill text-center">
        <img
          className="img-fluid"
          style={{
            borderRadius: "50%",
            height: "90px",
            width: "90px",
            objectFit: "cover",
          }}
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </a>
      <p className="text-center mt-2">Username: {user?.email?.split("@")[0]}</p>
      <p className="text-center">Role : {user?.role?.name}</p>
      <button className="btn btn-secondary btn-sm mx-5" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AvatarSidebar;
