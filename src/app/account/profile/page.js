import SelectCountry from "@/src/app/_components/SelectCountry";
import UpdateProfileForm from "../../_components/UpdateProfileForm";

export const metadata = {
  title: "Update Profile",
};

export default function Page() {
  // CHANGE


  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm></UpdateProfileForm>
    </div>
  );
}
