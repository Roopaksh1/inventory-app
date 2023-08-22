import { useRef } from 'react';

const SearchBar = ({ search = '', setSearch }) => {
  const input = useRef();
  const handleSearch = () => {
    setSearch(input.current.value);
  };
  return (
    <div className="relative">
      <div className="absolute top-4 left-3">
        <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
      </div>
      <input
        type="text"
        className="h-14 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none border-2"
        placeholder="Search anything..."
        value={search}
        onInput={handleSearch}
        ref={input}
      />
    </div>
  );
};

export default SearchBar;
