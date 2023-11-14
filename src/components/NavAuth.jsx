import { Link } from "react-router-dom";

const NavAuth = ({ haveAccount, isForgot }) => {
  return (
    <>
      <nav className="mt-8 lg:flex lg:justify-between">
        {haveAccount ? (
          <Link className="block text-center my-3 text-gray-500" to="/">
            You have an account? {""}
            <span className="text-indigo-600 underline">Log in now!</span>
          </Link>
        ) : (
          <Link className="block text-center my-3 text-gray-500" to="/register">
            You don't have an account? {""}
            <span className="text-indigo-600 underline">Register now!</span>
          </Link>
        )}
        {isForgot ? (
          <Link className="block text-center my-3 text-gray-500" to="/register">
            You don't have an account? {""}
            <span className="text-indigo-600 underline">Register now!</span>
          </Link>
        ) : (
          <Link
            className="block text-center my-3 text-gray-500 hover:text-indigo-500 hover:underline transition-all"
            to="/reset-password"
          >
            I forgot my pass!
          </Link>
        )}
      </nav>
    </>
  );
};

export default NavAuth;
