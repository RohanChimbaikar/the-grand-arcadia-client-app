"use server";

import { auth, signIn, signOut } from "@/src/app/_lib/auth";
import {
  createBooking as makeBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest as updateGuestData,
} from "@/src/app/_lib/data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

  redirect("/account/profile?updated=profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const bookings = await getBookings(session.user.guestId);
  const bookingIds = bookings.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const numberOfGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations");
  const bookingId = Number(formData.get("bookingId"));

  const session = await auth();

  if (!session) throw new Error("You must be logged in to perform this action");
  // const bookings = await getBookings(session.user.guestId);
  // const bookingIds = bookings.map((booking) => booking.id);

  // if (!bookingIds.includes(bookingId))
  //   throw new Error("You are not allowed to edit this booking");

  const updatedBooking = {
    numberOfGuests,
    observations,
  };

  await updateBooking(bookingId, updatedBooking);

  revalidatePath("/account/reservations");
  redirect("/account/reservations?updated=reservation");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to perform this action");

  const newBooking = {
    ...bookingData,
    guestID: session.user.guestId,
    numberOfGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    hasPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  await makeBooking(newBooking);

  revalidatePath(`/rooms/${bookingData.cabinID}`);

  redirect("/rooms/thankyou");
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
