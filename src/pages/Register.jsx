import { useState } from "react";
import axiosClient from "../config/axios";
import NavAuth from "../components/NavAuth";
import InputWrapper from "../components/InputWrapper";
import SubmitButton from "../components/SubmitButton";
import Alert from "../components/Alert";
import { MESSAGE_TYPES } from "../helpers/Objects";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [alert, setAlert] = useState({});

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  const handleRepeatPass = (e) => {
    setRepeatPass(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passMinLength = 6;

    if ([name, email, password, repeatPass].includes("")) {
      setAlert({ msg: "Please fill in all fields", type: MESSAGE_TYPES.ERROR });
      return;
    }

    if (password.length < passMinLength) {
      setAlert({
        msg: `Your password must be at least ${passMinLength} characters long`,
        type: MESSAGE_TYPES.ERROR,
      });
      return;
    }

    if (password !== repeatPass) {
      setAlert({ msg: "Passwords do not match", type: MESSAGE_TYPES.ERROR });
      return;
    }

    setAlert({});

    try {

      await axiosClient.post("/vets/", { name, email, password });
      setAlert({
        msg: "User create successfuly, check your email to verify your account",
        type: MESSAGE_TYPES.INFO,
      });
    } catch (error) {
      setAlert({ msg: error.response.data.msg, type: MESSAGE_TYPES.ERROR });
    }
  };

  const { msg } = alert;

  return (
    <>
      <section>
        <h1 className="text-gray-500 font-black text-6xl">
          Create your account and manage {""}
          <span className="text-indigo-600">yours patients</span>
        </h1>
      </section>
      <section className="mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}

        <form onSubmit={handleSubmit}>
          <InputWrapper
            type={"text"}
            id={"name"}
            text={"Name"}
            placeholder={"Example: Joe Doe"}
            state={name}
            handler={handleName}
          />
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
            handler={handlePass}
          />
          <InputWrapper
            id={"repeat-pass"}
            type={"password"}
            text={"Repeat your password"}
            placeholder={"Example: ************"}
            state={repeatPass}
            handler={handleRepeatPass}
          />
          {/* submit button */}
          <SubmitButton value={"Register"} />
        </form>

        <NavAuth haveAccount={true} isForgot={false} />
      </section>
    </>
  );
};

export default Register;
