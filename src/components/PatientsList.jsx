import usePatients from "../hooks/usePatients"
import Patient from "./Patient";

const PatientsList = () => {

  const { patients } = usePatients();

  return (
    <>
      {patients.length > 0 ?
        <>
          <h2 className="font-black text-3xl text-center">Patients List</h2>
          <p className="text-xl my-5 text-center">
            Manage your {" "}
            <span className="text-indigo-600 font-bold">patients and your appointments</span>
          </p>

          {patients.map(patient => (<Patient key={patient._id} patient={patient} />))}
        </>
        :
        (
          <>
            <h2 className="font-black text-3xl text-center">There are no patients available</h2>
            <p className="text-xl my-5 text-center">
              Start adding patients {" "}
              <span className="text-indigo-600 font-bold">and they will appear here</span>
            </p>
          </>
        )
      }
    </>
  )
}

export default PatientsList