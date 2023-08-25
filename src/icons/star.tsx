type StarIconProps = {
  filled: boolean,
  onClick: () => {},
}

const StarIcon = ({ filled = false, onClick, }: StarIconProps) => (
  <svg onClick={onClick} viewBox="0 0 53.867 53.867" stroke="#EFCE4A" strokeWidth={"4px"} width="24" height="24">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <polygon fill={filled ? "#EFCE4A" : "#3B82F6"} points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 ">
      </polygon>
    </g>
  </svg>
)

export default StarIcon
