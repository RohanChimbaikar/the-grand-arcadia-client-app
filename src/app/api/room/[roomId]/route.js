import { getBookedDatesByCabinId, getCabin } from "@/src/app/_lib/data-service";

export async function GET(request, { params }) {
  const { roomId } = await params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(roomId),
      getBookedDatesByCabinId(roomId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({message:"Cabin not found!"})
  }
}
