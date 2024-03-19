"use client";

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
        <Typography variant="h5">Status: {status}</Typography>
        {children}
      </main>
    </>
  );
}