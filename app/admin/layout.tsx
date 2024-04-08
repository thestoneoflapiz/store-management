"use client";

import AdminHeader from "@/components/admin/header";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode
}

export default function Layout({ children, ...props }: Props){
  const { data, status } = useSession();
  return(
    <>
      <main>
        <AdminHeader />
        {children}
      </main>
    </>
  );
}