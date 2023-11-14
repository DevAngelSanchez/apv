import { createContext, useState, useEffect } from "react";
import axiosClient from './../config/axios';
import useAuth from './../hooks/useAuth';

const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {


  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});
  const { auth } = useAuth();

  const savePatient = async (patient) => {

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    if (patient.id) {
      try {
        const { data } = await axiosClient.put(`/patients/${patient.id}`, patient, config);
        const patientsUpdated = patients.map(patientsState => patientsState._id === data._id ? data : patientsState);
        setPatients(patientsUpdated);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await axiosClient.post("/patients", patient, config);
        const { createdAt, updatedAt, __v, ...savedPatient } = data;
        setPatients([savedPatient, ...patients])
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  }

  const setEdit = (patient) => {
    setPatient(patient);
  }

  const deletePatient = async (id) => {
    const deleteConfirmed = confirm("Are you sure that you wish delete this log?");

    if (deleteConfirmed) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        await axiosClient.delete(`/patients/${id}`, config);
        const patientsUpdated = patients.filter(patientsState => patientsState._id !== id);
        setPatients(patientsUpdated);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    const getPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }

        const { data } = await axiosClient("/patients", config);
        setPatients(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
    getPatients();
  }, [auth]);

  return (
    <PatientsContext.Provider
      value={{
        patients,
        savePatient,
        setEdit,
        patient,
        deletePatient
      }}
    >
      {children}
    </PatientsContext.Provider>
  )
}

export default PatientsContext;