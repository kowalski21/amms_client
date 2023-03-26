import { useAuth } from "@/hooks/auth";
import { useSlideModalStore } from "@/stores/layout";
import Head from "next/head";
import React, { Fragment } from "react";
import { Loader } from "rsuite";
import GlobalModalSetting from "../slidemodal/GlobalModalSetting";
import ShortCutSlideModal from "../slidemodal/ShortCutSlideModal";
import AppContent from "./AppContent";
import AppNavbar from "./AppNavbar";
import AppSidebar from "./AppSidebar";
import AppWrapper from "./AppWrapper";

const AppLayout = ({ children }) => {
  const modalSlide = useSlideModalStore((state) => state.modalSlide);
  const { user, loading } = useAuth();
  return (
    <Fragment>
      <Head>
        <title>AMMS | PENTECOST HOSPITAL</title>
      </Head>
      <AppWrapper>
        {loading && <Loader center vertical />}
        {user && (
          <Fragment>
            <AppNavbar />
            <AppSidebar />
            <AppContent>{children}</AppContent>
            <ShortCutSlideModal />
          </Fragment>
        )}
      </AppWrapper>
      {modalSlide && <GlobalModalSetting />}
    </Fragment>
  );
};

export default AppLayout;
