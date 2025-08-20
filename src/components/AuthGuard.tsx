"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("Authentication");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!token || !isAdmin) {
      toast({
        title: "Unauthorized Access",
        description: "You don't have permission to view this page.",
        variant: "destructive",
      });
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
}