"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Bookings",
          url: "dashboard",
        },
        {
          title: "Subscriptions",
          url: "subscriptions",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    // Clear the session (e.g., remove token from localStorage)
    localStorage.removeItem("Authentication");

    // Show a success toast
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
      variant: "default",
    });

    // Redirect to the /auth route (login page)
    router.push("/auth");

    // Force a full page reload to reset the app state
    window.location.href = "/auth";
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>Grid Space</SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Logout Button at the Bottom */}
      <div className="mt-auto p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-900 transition-colors duration-200"
        >
          Logout
        </button>
      </div>

      <SidebarRail />
    </Sidebar>
  );
}