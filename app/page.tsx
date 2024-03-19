"use client";

import { Typography } from "@mui/material";
import LoginPage from "@/components/auth/login";
import styles from "@/app/page.module.css";

export default function Home() {
  
  return (
    <main className={styles.main}>
      <LoginPage />
    </main>
  );
}
