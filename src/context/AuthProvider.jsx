import { useState, useEffect, createContext } from 'react';
import axiosClient from '../config/axios';
import { MESSAGE_TYPES } from '../helpers/Objects';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const AuthenticateUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      };

      const config = {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await axiosClient('/vets/profile', config);
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }

      setLoading(false);
    }
    AuthenticateUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setAuth([]);
  }

  const updateProfile = async (info) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    };

    const config = {
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      await axiosClient.put(`/vets/profile/${info._id}`, info, config);
      return {
        msg: "Saved succesfully",
        type: MESSAGE_TYPES.INFO
      }
    } catch (error) {
      return {
        msg: error.response.data.msg,
        type: MESSAGE_TYPES.ERROR
      }
    }
  }

  const savePass = async (info) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    };

    const config = {
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const { data } = await axiosClient.put("/vets/change-password", info, config);

      return {
        msg: data.msg,
        type: MESSAGE_TYPES.INFO,
        redirect: true
      }
    } catch (error) {
      return {
        msg: error.response.data.msg,
        type: MESSAGE_TYPES.ERROR
      }
    }
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, logout, updateProfile, savePass }}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthProvider
};

export default AuthContext;