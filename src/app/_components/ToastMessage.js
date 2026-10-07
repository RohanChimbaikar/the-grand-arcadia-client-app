"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const messages = {
  profile: "Profile updated successfully!",
  reservation: "Reservation updated successfully!",
};

export default function ToastMessage() {
  const searchParams = useSearchParams();
  const updated = searchParams.get("updated");

  useEffect(() => {
    if (!updated || !messages[updated]) return;

    toast.success(messages[updated], {
      id: `updated-${updated}`,
    });

    window.history.replaceState({}, "", window.location.pathname);
  }, [updated]);

  return null;
}
