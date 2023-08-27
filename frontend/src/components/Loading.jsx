import PropTypes from 'prop-types';

const Loading = ({ action, bgColor, textColor }) => {
  return (
    <div
      className={`fixed top-0 left-0 min-w-[100vw] min-h-[100vh] flex ${bgColor} justify-center items-center`}
    >
      <div
        className={`flex-grow text-4xl w-full flex flex-col gap-4 justify-center items-center sm:text-5x p-4 ${textColor}`}
      >
        <i className="fa-solid fa-circle-notch animate-spin"></i>
        <p>{action}</p>
      </div>
    </div>
  );
};

Loading.propTypes = {
  action: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

Loading.defaultProp = {
  action: 'Loading',
  bgColor: 'white',
  textColor: 'black',
};

export default Loading;
