import usePatients from "../hooks/usePatients";

const Patient = ({ patient }) => {

  const { _id, name, email, owner, symptoms, date } = patient;

  const dateFormatter = (date) => {
    const newDate = new Date(date);
    return Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(newDate);
  }

  const { setEdit, deletePatient } = usePatients();

  const formattedDate = dateFormatter(date);

  return (
    <div className="m-5 bg-white shadow-md p-5 rounded-xl">
      <p className="font-bold uppercase text-indigo-800"> Name: {" "}
        <span className="font-normal normal-case text-black">{name}</span>
      </p>
      <p className="font-bold uppercase text-indigo-800"> Owner: {" "}
        <span className="font-normal normal-case text-black">{owner}</span>
      </p>
      <p className="font-bold uppercase text-indigo-800"> Email: {" "}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>
      <p className="font-bold uppercase text-indigo-800"> High Date: {" "}
        <span className="font-normal normal-case text-black">{formattedDate}</span>
      </p>
      <p className="font-bold uppercase text-indigo-800"> Symptoms: {" "}
        <span className="font-normal normal-case text-black">{symptoms}</span>
      </p>

      <div className="flex justify-between my-5">
        <button type="button" className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg" onClick={() => setEdit(patient)}>Edit</button>
        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
          onClick={() => deletePatient(_id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Patient;