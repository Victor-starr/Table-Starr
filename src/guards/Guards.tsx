import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface GuardProps {
  children: React.ReactNode;
}

// Only allow if NOT logged in
const RequireGuest: React.FC<GuardProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      router.push("/tables-list");
    }
  }, [router]);

  return <>{children}</>;
};

// Only allow if logged in
const RequireAuth: React.FC<GuardProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
};

export { RequireGuest, RequireAuth };
