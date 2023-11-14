import { useEffect, useState } from "react";
import AdminNav from "../../components/AdminNav";
import InputWrapper from "../../components/InputWrapper";
import useAuth from './../../hooks/useAuth';
import { MESSAGE_TYPES } from './../../helpers/Objects';
import Alert from './../../components/Alert';


const EditProfile = () => {

  const { auth, updateProfile } = useAuth();
  const [profile, setProfile] = useState({});
  const [alert, setAlert] = useState({});

  useEffect(() => {
    setProfile(auth);
  }, [auth]);

  const handleName = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleEmail = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handlePhoneNumber = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleWebsite = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email } = profile;

    if ([name, email].includes("")) {
      setAlert({ msg: "Field's name and email are required", type: MESSAGE_TYPES.ERROR });
      return;
    }

    const response = await updateProfile(profile);

    setAlert(response);
  }

  const { msg } = alert;
  return (
    <>
      <AdminNav />
      <h2 className="text-black text-center text-3xl font-bold mt-5">Edit your profile</h2>
      <p className="text-xl my-5 text-center ">
        Edit your {" "}
        <span className="text-indigo-600 font-bold">info here</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-5">

          {msg && <Alert alert={alert} />}

          <form onSubmit={handleSubmit}>
            <InputWrapper
              id={"name"}
              type={"text"}
              text={"Name"}
              placeholder={"john doe"}
              state={profile.name || ""}
              name="name"
              handler={handleName}
            />
            <InputWrapper
              id={"website"}
              type={"text"}
              text={"Web Site"}
              placeholder={"google.com"}
              state={profile.website || ""}
              handler={handleWebsite}
              name="website"
            />
            <InputWrapper
              id={"phoneNumber"}
              type={"tel"}
              text={"Phone Number"}
              placeholder={"+583335555222"}
              state={profile.phoneNumber || ""}
              name="phoneNumber"
              handler={handlePhoneNumber}
            />
            <InputWrapper
              id={"email"}
              type={"text"}
              text={"Email"}
              placeholder={"johndow@gmail.com"}
              state={profile.email || ""}
              name="email"
              handler={handleEmail}
            />

            <button
              type="submit"
              className="bg-indigo-700 w-full px-10 py-3 text-white font-bold uppercase rounded-lg mt-5 cursor-pointer"
            >Save Changes</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditProfile;