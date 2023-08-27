const Contact = () => {
  return (
    <nav className="flex-grow flex flex-col justify-center items-center gap-10">
      <div className="flex flex-col sm:flex-row sm:text-3xl sm:gap-10 gap-5">
        <a href="https://github.com/Roopaksh1" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-github fa-4x hover:scale-125 transition-transform cursor-pointer"></i>
        </a>

        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-facebook fa-4x hover:scale-125 transition-transform cursor-pointer"></i>
        </a>
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-twitter fa-4x hover:scale-125 transition-transform cursor-pointer"></i>
        </a>
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-instagram fa-4x hover:scale-125 transition-transform cursor-pointer"></i>
        </a>
      </div>
      <p className="text-2xl font-bold tracking-widest font-serif sm:text-3xl">
        InStock
      </p>
    </nav>
  );
};

export default Contact;
