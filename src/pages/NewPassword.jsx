import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import InputWrapper from "../components/InputWrapper";
import SubmitButton from "../components/SubmitButton";
import Alert from "../components/Alert";
import { MESSAGE_TYPES } from "../helpers/Objects";
import axiosClient from "../config/axios";

const NewPassword = () => {

  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const [validToken, setValidToken] = useState(false);
  const [modifiedPass, setModifiedPass] = useState(false);
  const params = useParams();
  const { token } = params;

  const handlePass = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      return setAlert({ msg: "The password field cannot be empty", type: MESSAGE_TYPES.ERROR })
    }

    if (password.length <= 6) {
      return setAlert({ msg: "The password will be bigger than 6 characters", type: MESSAGE_TYPES.ERROR });
    }

    try {
      const url = `/vets/reset-pass/${token}`;
      const { data } = await axiosClient.post(url, { password });
      setAlert({ msg: data.msg });
      setModifiedPass(true);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, type: MESSAGE_TYPES.ERROR })
    }
  }

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/vets/reset-pass/${token}`);
        setAlert({ msg: "Set your new password" });
        setValidToken(true);
      } catch (error) {
        setAlert({ msg: "This link is unavaible", type: MESSAGE_TYPES.ERROR });
      }
    }
    checkToken();
  }, []);

  const { msg } = alert;

  return (
    <>
      <section>
        <h1 className="text-gray-500 font-black text-6xl">
          Reset your password and don't lost access to {""}
          <span className="text-indigo-600">yours patients</span>
        </h1>
      </section>
      <section className="mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}
        {validToken && (
          <>
            <form onSubmit={handleSubmit}>
              <InputWrapper
                id={"password"}
                type={"password"}
                text={"New Password"}
                placeholder={"********"}
                state={password}
                handler={handlePass}
              />
              <SubmitButton value={"Set Password"} />
            </form>
          </>
        )}

        {modifiedPass && (
          <Link className="block text-center my-3 text-gray-500" to="/">
            <span className="text-indigo-600 underline">Log in now!</span>
          </Link>
        )}
      </section>
    </>
  );
};

export default NewPassword;
