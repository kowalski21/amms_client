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
          src={`/avatar.jpg`}
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
