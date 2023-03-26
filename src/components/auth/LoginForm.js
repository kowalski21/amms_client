import { useNotify } from "@/hooks/notify";
import { directus } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Message } from "rsuite";
const LoginForm = () => {
  const router = useRouter();
  const { showMsg } = useNotify();
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const handleFormChange = (key, value) => {
    setMsg("");
    setForm({ ...form, [key]: value });
  };
  const loginMutation = useMutation({
    mutationFn: async (payload) => {
      console.log(payload);
      const res = await directus.auth.login(payload);
    },
    onSuccess: (data) => {
      router.push("/");
      showMsg("USER LOGIN SUCCESS");
    },
    onError: (error) => {
      console.log(error.message);
      setMsg(error.message);
    },
  });

  const handleSubmit = () => {
    let payload = { ...form };
    payload.email = `${form.username}@gmail.com`;
    delete payload.username;
    loginMutation.mutate(payload);
  };
  return (
    <div>
      {msg && (
        <Message type="error" className="mb-2">
          {msg}
        </Message>
      )}
      <div class="form-outline mb-4">
        <input
          type="text"
          class="form-control form-control-lg"
          onChange={(e) => handleFormChange("username", e.target.value)}
          value={form.username}
        />
        <label class="form-label mt-2">Username</label>
      </div>

      <div class="form-outline mb-4">
        <input
          type="password"
          onChange={(e) => handleFormChange("password", e.target.value)}
          value={form.password}
          class="form-control form-control-lg"
        />
        <label class="form-label mt-2">Password</label>
      </div>

      <div class="pt-1 mb-4">
        <button
          class="btn btn-dark btn-lg btn-block"
          type="button"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
