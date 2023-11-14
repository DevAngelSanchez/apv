import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../config/axios';
import Alert from '../components/Alert';
import { MESSAGE_TYPES } from '../helpers/Objects';

const ConfirmAccount = () => {

  const [accountConfirmed, setAccountConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/vets/confirm/${id}`;
        const { data } = await axiosClient(url);
        setAccountConfirmed(true);
        setAlert({
          msg: data.msg,
          type: MESSAGE_TYPES.INFO
        });
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          type: MESSAGE_TYPES.ERROR
        });
      }
      setLoading(false);
    }

    confirmAccount();
  }, []);

  return (
    <>
      <section>
        <h1 className="text-gray-500 font-black text-6xl">
          Verify your account and manage {""}
          <span className="text-indigo-600">yours patients</span>
        </h1>
      </section>
      <section className="mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white">
        {!loading && <Alert alert={alert} />}
        {accountConfirmed && (
          <Link className="block text-center my-3 text-gray-500" to="/">
            <span className="text-indigo-600 underline">Log in now!</span>
          </Link>
        )}
      </section>
    </>
  );
};

export default ConfirmAccount;
