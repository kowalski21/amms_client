import AuthLoginWrapper from "@/components/auth/AuthLoginWrapper";
import LoginForm from "@/components/auth/LoginForm";
import React from "react";

const AccountLoginPage = () => {
  return (
    <AuthLoginWrapper>
      <LoginForm />
    </AuthLoginWrapper>
  );
};

export default AccountLoginPage;
