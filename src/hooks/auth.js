import { directus } from "@/lib/api";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const modUser = useAuthStore((state) => state.modUser);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAuthUser = async () => {
      setLoading(true);
      try {
        const res = await directus.users.me.read({
          fields: "*,role.id,role.name",
        });
        setLoading(false);
        modUser(res);
        setUser(res);
      } catch (error) {
        setLoading(false);
        modUser(null);
        setUser(null);
        router.push("/auth/login");
      }
    };

    getAuthUser();
  }, [router.asPath]);

  return { user, loading };
};

export const useAuthenticated = () => {
  const router = useRouter();
  useEffect(() => {
    const { user, loading } = useAuth();
    if (["Administrator"].includes(user.role.name)) {
    } else {
      router.push("/");
    }
  }, []);
};
