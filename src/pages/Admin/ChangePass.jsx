import { useState } from "react";
import AdminNav from "../../components/AdminNav";
import Alert from './../../components/Alert';
import InputWrapper from "../../components/InputWrapper";
import { MESSAGE_TYPES } from "../../helpers/Objects";
import useAuth from './../../hooks/useAuth';
import { useNavigate } from "react-router-dom";

const ChangePass = () => {

  const navigate = useNavigate();

  const { savePass } = useAuth();

  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState({
    pwdCurrent: "",
    pwdNew: ""
  });

  const handlePass = e => setPassword({ ...password, [e.target.name]: e.target.value });
  const handleNewPass = e => setPassword({ ...password, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(password).some(field => field === "")) {
      setAlert({
        msg: "All fields are required",
        type: MESSAGE_TYPES.ERROR
      });
      return;
    }

    if (password.pwdNew.length < 6) {
      setAlert({
        msg: "The password would be at leas 6 characters",
        type: MESSAGE_TYPES.ERROR
      });
      return;
    }

    const response = await savePass(password);
    setAlert(response);

    if (response.redirect) {
      setTimeout(() => {
        navigate("/admin");
      }, 3000);
    }
  }

  const { msg } = alert;

  return (
    <>
      <AdminNav />
      <h2 className="text-black text-center text-3xl font-bold mt-5">Change your password</h2>
      <p className="text-xl my-5 text-center ">
        Edit your password {" "}
        <span className="text-indigo-600 font-bold">when you needed</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-5">

          {msg && <Alert alert={alert} />}

          <form onSubmit={handleSubmit}>
            <InputWrapper
              id={"pwdCurrent"}
              type={"password"}
              text={"Your password"}
              placeholder={"12345678"}
              name="pwdCurrent"
              handler={handlePass}
            />
            <InputWrapper
              id={"pwdNew"}
              type={"password"}
              text={"New password"}
              placeholder={"Your new pass"}
              name="pwdNew"
              handler={handleNewPass}
            />

            <button
              type="submit"
              className="bg-indigo-700 w-full px-10 py-3 text-white font-bold uppercase rounded-lg mt-5 cursor-pointer"
            >Update pass</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangePass;