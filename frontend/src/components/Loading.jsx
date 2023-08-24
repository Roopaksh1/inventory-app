const Loading = () => {
  return (
    <div className="flex-grow text-4xl w-full flex flex-col gap-4 justify-center items-center sm:text-5xl">
      <i className="fa-solid fa-circle-notch animate-spin"></i>
      <p>Loading</p>
    </div>
  )
}

export default Loading;