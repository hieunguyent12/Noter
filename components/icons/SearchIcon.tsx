type Props = {
  className?: string;
};
const SearchIcon = ({ className }: Props) => (
  // <div className="flex justify-center items-center mr-2 hover:bg-accent-hover">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${className}`}
    fill="none"
    viewBox="-2 -2 30 30"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export default SearchIcon;
