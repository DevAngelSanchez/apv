import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavAuth from "../components/NavAuth";
import InputWrapper from "../components/InputWrapper";
import SubmitButton from "../components/SubmitButton";
import useAuth from "../hooks/useAuth";
import Alert from '../components/Alert';
import { MESSAGE_TYPES } from '../helpers/Objects';
import axiosClient from '../config/axios';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();

  const { setAuth } = useAuth();


  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      return setAlert({
        msg: "All fields are required!",
        type: MESSAGE_TYPES.ERROR
      });
    }

    try {
      const { data } = await axiosClient.post(`/vets/login`, { email, password });
      localStorage.setItem("token", data.token);
      setAuth(data)
      navigate("/admin");
    } catch (error) {
      setAlert({ msg: error.response.data.msg, type: MESSAGE_TYPES.ERROR });
    }
  }

  const { msg } = alert;

  return (
    <>
      <section>
        <h1 className="text-gray-500 font-black text-6xl">
          Login and manage yours{""}
          <span className="text-indigo-600">patients</span>
        </h1>
      </section>
      <section className="mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white">

        {msg && <Alert alert={alert} />}

        <form onSubmit={handleSubmit}>
          <InputWrapper
            id={"email"}
            type={"email"}
            text={"Email"}
            placeholder={"Example: test@test.com"}
            state={email}
            handler={handleEmail}
          />
          <InputWrapper
            id={"pass"}
            type={"password"}
            text={"Password"}
            placeholder={"Example: ************"}
            state={password}
            handler={handlePassword}
          />
          <SubmitButton value={"Log in"} />
        </form>

        <NavAuth haveAccount={false} isForgot={false} />
      </section>
    </>
  );
}

export default Login;
