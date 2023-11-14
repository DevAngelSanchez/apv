const SubmitButton = ({ value }) => {
  return (
    <>
      <input
        type="submit"
        value={value}
        className="bg-indigo-600 w-full py-3 px-10 rounded-xl uppercase font-bold text-white hover:cursor-pointer hover:bg-indigo-700 transition-colors"
      />
    </>
  );
};

export default SubmitButton;
