import PropTypes from 'prop-types';

const Button = ({ children, color, style, action, id }) => {
  return (
    <button
      onClick={action}
      type="submit"
      data-id={id}
      className={`text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800 ${style}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  color: PropTypes.string,
  style: PropTypes.string,
  action: PropTypes.func,
  id: PropTypes.string,
};

Button.defaultProps = {
  action: () => {},
  color: 'blue',
  style: '',
};

export default Button;
