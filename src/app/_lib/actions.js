"use server";

import { auth, signIn, signOut } from "@/src/app/_lib/auth";
import { updateGuest as updateGuestData } from "@/src/app/_lib/data-service";
import { revalidatePath } from "next/cache";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[A-Za-z0-9][A-Za-z0-9 -]{4,19}$/.test(nationalID)) {
    throw new Error("Please provide a valid national ID");
  }

  const updateData = {
    nationalID,
    nationality,
    countryFlag,
  };
  await updateGuestData(session.user.guestId, updateData);
  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}
