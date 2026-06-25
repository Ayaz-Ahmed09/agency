type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "h-8 w-8" }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="29" fill="#0D0808" stroke="rgba(255,238,226,0.18)" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="24" stroke="rgba(255,143,68,0.34)" strokeWidth="1.2" />
      <path
        d="M21 45.5H43"
        stroke="#FF8C42"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M23.5 19.5H38.5C42.6421 19.5 46 22.8579 46 27C46 31.1421 42.6421 34.5 38.5 34.5H28.5V45.5H23.5V19.5Z"
        fill="#F5F1EA"
      />
      <path
        d="M30.5 24.5H38C39.933 24.5 41.5 26.067 41.5 28C41.5 29.933 39.933 31.5 38 31.5H30.5V24.5Z"
        fill="#0D0808"
      />
      <path
        d="M19 45.5H45"
        stroke="#F5F1EA"
        strokeOpacity="0.18"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M26 16L28.5 11.5H35.5L38 16"
        stroke="#FF8C42"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
