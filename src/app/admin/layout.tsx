import React from 'react';
import { getStaffSession } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopNav from '@/components/admin/AdminTopNav';

export const metadata = {
  title: 'Admin Console | Talenty Consultancy',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const staff = getStaffSession();

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col md:flex-row text-stone-900">
      {staff && <AdminSidebar staff={staff} />}

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {staff && <AdminTopNav staff={staff} />}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#FAF8F5]">{children}</main>
      </div>
    </div>
  );
}
