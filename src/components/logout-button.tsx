'use client'

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useDict } from "@/lib/i18n";

export default function LogoutButton() {
  const router = useRouter();
  const t = useDict();

  const handleLogout = async () => {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
               router.refresh();     
            }
        }
    });
  }
  
  return (
    <Button onClick={handleLogout} variant="outline">
      {t.common.logout}
    </Button>
  );
}