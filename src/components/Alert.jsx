import { MESSAGE_TYPES } from "../helpers/Objects";

const Alert = ({ alert }) => {
  return (
    <div
      className={`${
        alert.type === MESSAGE_TYPES.ERROR
          ? "from-red-400 to-red-600"
          : "from-indigo-400 to-indigo-600"
      } bg-gradient-to-r text-center p-3 rounded-xl text-white font-bold text-sm mb-10 uppercase`}
    >
      {alert.msg}
    </div>
  );
};

export default Alert;
