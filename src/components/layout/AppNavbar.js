import { useLayoutStore, useSlideModalStore } from "@/stores/layout";
import React from "react";

const AppNavbar = () => {
  const modLayout = useLayoutStore((state) => state.modClose);
  const toggleModalSlide = useSlideModalStore(
    (state) => state.toggleModalSlide
  );
  return (
    <nav class="topnav navbar navbar-light">
      <button
        class="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar"
        onClick={modLayout}
      >
        <i class="fe fe-menu navbar-toggler-icon"></i>
      </button>
      {/* <ul className="nav">
        <li class="nav-item">
          <a class="nav-link text-muted my-2 sc" onClick={toggleModalSlide}>
            <span class="fe fe-grid fe-16"></span>
          </a>
        </li>
      </ul> */}
    </nav>
  );
};

export default AppNavbar;
