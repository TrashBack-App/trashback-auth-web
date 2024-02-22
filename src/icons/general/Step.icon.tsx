const StepIcon = ({ iconClass }: IconProps) => {
  return (
    <svg
      className={iconClass}
      viewBox="0 0 21 20"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      fill="none"
    >
      <rect
        x="1.13301"
        y="0.3"
        width="19.4"
        height="19.4"
        rx="9.7"
        strokeWidth="0.6" // Remove stroke="#DCDDE0"
      />
      <path
        d="M10.505 14.5V6.4H8.82501V5.56H11.465V14.5H10.505Z"
        fill="#A0A3AB"
      />
    </svg>
  );
};

export default StepIcon;
