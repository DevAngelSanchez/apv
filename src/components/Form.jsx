import { useState, useEffect } from "react";

import InputWrapper from "./InputWrapper";
import { MESSAGE_TYPES } from './../helpers/Objects';
import Alert from './Alert';
import usePatients from "../hooks/usePatients";

const Form = () => {

  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [id, setId] = useState(null);

  const [alert, setAlert] = useState({});

  const { savePatient, patient } = usePatients();

  useEffect(() => {
    if (patient?.name) {
      setName(patient.name);
      setOwner(patient.owner);
      setEmail(patient.email);
      setDate(new Date(patient.date).toISOString());
      setSymptoms(patient.symptoms);
      setId(patient._id);
    }
  }, [patient])

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleOwner = (e) => {
    setOwner(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleDate = (e) => {
    setDate(e.target.value);
  }

  const handleSymptoms = (e) => {
    setSymptoms(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([name, owner, email, date, symptoms].includes("")) {
      setAlert({ msg: "All fields are required!", type: MESSAGE_TYPES.ERROR });
      return;
    }

    savePatient({ name, owner, email, date, symptoms, id });
    setAlert({ msg: "Saved Successfully!", type: MESSAGE_TYPES.INFO });

    // Reset form values
    setName("");
    setOwner("");
    setEmail("");
    setDate("");
    setSymptoms("");
    setId(null);
  }

  const { msg } = alert;

  return (
    <>
      <h2 className="font-black text-3xl text-center">Patient Manager</h2>
      <p className="text-xl text-center my-5">
        Add your patients and {" "}
        <span className="text-indigo-600 font-bold">manage them</span>
      </p>

      <form className="bg-white py-5 px-5 mb-10 lg:mb-0 shadow-md rounded-md">
        <InputWrapper
          id={"pet name"}
          type={"text"}
          text={"Pet Name"}
          placeholder={"Scooby"}
          state={name}
          handler={handleName}
        />
        <InputWrapper
          id={"name"}
          type={"text"}
          text={"Owner Name"}
          placeholder={"John Doe"}
          state={owner}
          handler={handleOwner}
        />
        <InputWrapper
          id={"email"}
          type={"text"}
          text={"Owner Email"}
          placeholder={"johndoe@gmail.com"}
          state={email}
          handler={handleEmail}
        />
        <InputWrapper
          id={"date"}
          type={"date"}
          text={"Date high"}
          state={date}
          handler={handleDate}
        />
        <InputWrapper
          id={"symptoms"}
          text={"Symptoms"}
          placeholder={"Describe the symptoms"}
          state={symptoms}
          handler={handleSymptoms}
          isTextarea={true}
        />

        <input
          type="submit"
          className="bg-indigo-600 text-white font-bold w-full p-3 rounded-md uppercase hover:bg-indigo-700 cursor-pointer transition-colors"
          onClick={handleSubmit}
          value={id ? "Edit patient" : "Add patient"}
        />
      </form>

      {msg && <Alert alert={alert} />}
    </>
  )
}

export default Form;