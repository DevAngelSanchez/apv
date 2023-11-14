import { useState } from "react";
import Alert from "../components/Alert";
import axiosClient from "../config/axios";
import SubmitButton from "../components/SubmitButton";
import InputWrapper from "../components/InputWrapper";
import NavAuth from "../components/NavAuth";
import { MESSAGE_TYPES } from "../helpers/Objects";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (email === '' || email.length <= 6) {
      setAlert({
        msg: `The email field is required`,
        type: MESSAGE_TYPES.ERROR,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post('/vets/reset-pass', { email });
      setAlert({
        msg: data.msg
      });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        type: MESSAGE_TYPES.ERROR,
      });
    }
  }

  const { msg } = alert;

  return (
    <>
      <section>
        <h1 className="text-gray-500 font-black text-6xl">
          Enter your email to change{""}
          <span className="text-indigo-600"> your password</span>
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
          <SubmitButton value={"Send Email"} />
        </form>
        <NavAuth haveAccount={true} isForgot={true} />
      </section>
    </>
  );
};

export default ResetPassword;
