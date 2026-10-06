import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ room }) {
  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(room.id),
    await getSettings(),
  ]);
  const session = await auth();

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_31rem] min-h-100 border border-primary-800">
      <DateSelector room={room} bookedDates={bookedDates} settings={settings} />
      {session?.user ? (
        <ReservationForm room={room} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
