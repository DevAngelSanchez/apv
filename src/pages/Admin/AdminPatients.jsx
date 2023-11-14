import Form from "../../components/Form";
import PatientsList from "../../components/PatientsList";
import { useState } from "react";

const AdminPatients = () => {

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section className="flex flex-col md:flex-row">
        <button
          type="button"
          className="bg-indigo-600 text-white font-bold uppercase mx-5 p-5 rounded-md mb-5 md:hidden"
          onClick={() => { setShowForm(!showForm) }}
        >{!showForm ? 'Show Form' : 'Hide Form'}</button>
        <div className={`${showForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
          <Form />
        </div>
        <div className="md:w-1/2 lg:w-3/5">
          <PatientsList />
        </div>
      </section>
    </>
  )
}

export default AdminPatients;