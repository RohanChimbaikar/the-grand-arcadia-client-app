import Spinner from "../_components/Spinner";

function loading() {
  return (
    <div className="grid justify-center items-center">
      <Spinner />
      <p className="text-2xl text-primary-200">Loading rooms data....</p>
    </div>
  );
}

export default loading;
