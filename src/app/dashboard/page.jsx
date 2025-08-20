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
import bookingService from "@/app/services/bookingService";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingService.listBookings();
      setBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const approveBookings = async (id) => {
    try {
      await bookingService.approveBookings(id);
      fetchBookings();
    } catch (error) {
      console.error("Error approving bookings:", error);
    }
  };

  const deleteBookings = async (id) => {
    try {
      await bookingService.deleteBookings(id);
      fetchBookings();
    } catch (error) {
      console.error("Error deleting bookings:", error);
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
            <h1 className="text-3xl font-bold mb-4">Bookings</h1>
            <p className="text-lg text-gray-300">
              Manage all bookings efficiently with powerful tools and insights
              designed for admins.
            </p>
          </div>

          <Table>
            <TableCaption>List of all bookings</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.user.name}</TableCell>
                  <TableCell>{booking.user.email}</TableCell>
                  <TableCell>
                    {new Date(booking.fromDate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(booking.toDate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={booking.isApproved ? "success" : "destructive"}
                    >
                      {booking.isApproved ? "Approved" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="success"
                      className="mr-2"
                      onClick={() => approveBookings(booking.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => deleteBookings(booking.id)}
                    >
                      Delete
                    </Button>
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
