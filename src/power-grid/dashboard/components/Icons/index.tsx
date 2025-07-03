"use client";

export const PowerGridIcon: React.FC<{ color?: string }> = ({
  color = "currentColor",
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 14h4v7h4V7h4v14h4V3"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BatteryIcon: React.FC<{ color?: string }> = ({
  color = "currentColor",
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="6"
      width="18"
      height="12"
      rx="2"
      stroke={color}
      strokeWidth="2"
    />
    <path
      d="M20 10h2v4h-2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 10v4M11 10v4M15 10v4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const NuclearIcon: React.FC<{ color?: string }> = ({
  color = "currentColor",
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" />
    <circle cx="12" cy="12" r="2" fill={color} />
    <path
      d="M12 4v4M12 16v4M4 12h4M16 12h4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const HydroIcon: React.FC<{ color?: string }> = ({
  color = "currentColor",
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3v8M7 9c2.5 3 7.5 3 10 0"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 13a7 7 0 1014 0c0-3-2-5-4-7h-6c-2 2-4 4-4 7z"
      stroke={color}
      strokeWidth="2"
    />
  </svg>
);

export const WindIcon: React.FC<{ color?: string }> = ({
  color = "currentColor",
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 8h13a3 3 0 110 6h-3"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 12h9a3 3 0 000-6H6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 16h9a3 3 0 010 6H3"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const GasIcon: React.FC<{ color?: string }> = ({
  color = "currentColor",
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 3h8l2 4v10a2 2 0 01-2 2H8a2 2 0 01-2-2V7l2-4z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 14a2 2 0 104 0 2 2 0 10-4 0M6 7h12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SolarIcon: React.FC<{ color?: string }> = ({
  color = "currentColor",
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2" />
    <path
      d="M12 3v2M12 19v2M3 12H5M19 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M18.5 5.5l-1.4 1.4M6.9 17.1l-1.4 1.4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const BiofuelIcon: React.FC<{ color?: string }> = ({
  color = "currentColor",
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2c-4 4-6 7-6 11a6 6 0 0012 0c0-4-2-7-6-11z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7c-2 2-3 3.5-3 5.5a3 3 0 006 0c0-2-1-3.5-3-5.5z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ImportIcon: React.FC<{ color?: string }> = ({
  color = "currentColor",
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3v14M5 10l7 7 7-7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 17v4h18v-4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ExportIcon: React.FC<{ color?: string }> = ({
  color = "currentColor",
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 17V3M5 10l7-7 7 7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 17v4h18v-4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
