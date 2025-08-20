"use client";

import AuthGuard from "@/components/AuthGuard"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useState, useEffect } from "react";
import subscriptionService from "@/app/services/subscriptionService";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
      setIsClient(true);
      fetchSubscriptions();
  
      console.log(subscriptions);
    }, []);
    const fetchSubscriptions = async () => {
      try {
        const response = await subscriptionService.listSubscriptions();
        console.log(response);
        setSubscriptions(response.data.subscriptions);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
  
    if (!isClient) return null;
    return (
      <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="p-6 bg-slate-900 text-white rounded-xl shadow-lg">
              <h1 className="text-3xl font-bold mb-4">Subscriptions</h1>
              <p className="text-lg text-gray-300">
                Oversee subscriptions seamlessly with advanced admin controls and
                monitoring.
              </p>
            </div>
  
            <Table>
              <TableCaption>List of all suscribed users</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell>{sub.id}</TableCell>
                    <TableCell>{sub.user.name}</TableCell>
                    <TableCell>{sub.user.phone}</TableCell>
                    <TableCell>
                      {new Date(sub.fromDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(sub.toDate).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </SidebarInset>
      </SidebarProvider>
      </AuthGuard>
    );
  }