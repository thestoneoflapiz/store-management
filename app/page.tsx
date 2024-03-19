"use client";

import LoginPage from "@/components/auth/login";
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  if(status === "authenticated"){
    router.push("/admin");
    return;
  }

  return (
    <main className={styles.main}>
      <LoginPage />
    </main>
  );
}
