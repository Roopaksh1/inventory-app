import PropTypes from 'prop-types';

const EmptyBox = ({ text, style }) => {
  return <div className={style}>{text}</div>;
};

EmptyBox.propTypes = {
  text: PropTypes.string,
  style: PropTypes.string,
};

export default EmptyBox;
