const InputWrapper = ({ id, type, text, placeholder, state, handler, isTextarea = false, name = "" }) => {
  return (
    <>
      <div className="my-5">
        <label
          htmlFor={id}
          className="uppercase text-gray-600 block text-xl font-bold"
        >
          {text}
        </label>
        {!isTextarea ? (
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            value={state}
            onChange={(e) => handler(e)}
            autoComplete="true"
            name={name}
          />
        ) : (
          <textarea
            id={id}
            placeholder={placeholder}
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            value={state}
            onChange={(e) => handler(e)}
            name={name}
          ></textarea>
        )}
      </div>
    </>
  );
};

export default InputWrapper;
