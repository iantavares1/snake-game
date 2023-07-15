export const BackIcon = ({ onClick, style }) => {
  return (
    <>
      <svg
        onClick={onClick}
        style={style}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30 13.125H7.125L17.625 2.625L15 0L0 15L15 30L17.625 27.375L7.125 16.875H30V13.125Z"
          fill="white"
        />
      </svg>
    </>
  )
}
