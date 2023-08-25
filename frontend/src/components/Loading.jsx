const Loading = ({ action = 'Loading', bgColor = 'white' }) => {
  return (
    <div
      className={`fixed top-0 left-0 min-w-[100vw] min-h-[100vh] flex ${bgColor} justify-center items-center`}
    >
      <div className="flex-grow text-4xl w-full flex flex-col gap-4 justify-center items-center sm:text-5xl bg-white p-4">
        <i className="fa-solid fa-circle-notch animate-spin"></i>
        <p>{action}</p>
      </div>
    </div>
  );
};

export default Loading;
