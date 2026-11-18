/** Original decorative vector light study; no canvas or WebGL. */
export default function LuxMark() {
  return (
    <svg
      viewBox="0 0 600 430"
      fill="none"
      className="lux-mark"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="lux-metal"
          x1="130"
          y1="100"
          x2="425"
          y2="390"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f1f3f5" />
          <stop offset=".3" stopColor="#8897a8" />
          <stop offset=".53" stopColor="#202831" />
          <stop offset=".72" stopColor="#bcc8d4" />
          <stop offset="1" stopColor="#566474" />
        </linearGradient>
        <linearGradient
          id="lux-edge"
          x1="140"
          y1="150"
          x2="475"
          y2="345"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#d1dfed" />
          <stop offset=".55" stopColor="#a1b4c8" />
          <stop offset="1" stopColor="#344559" />
        </linearGradient>
      </defs>
      <g stroke="#34404b" strokeWidth=".7">
        <ellipse cx="320" cy="305" rx="243" ry="87" />
        <ellipse cx="320" cy="305" rx="197" ry="69" />
        <path
          d="M42 305h510M320 190v212M136 351l370-125"
          strokeDasharray="3 7"
        />
      </g>
      <path
        d="M187 75l60-25v214l226-94v80L187 370V75Z"
        fill="url(#lux-metal)"
        stroke="#a6b6c5"
        strokeWidth="1.1"
      />
      <path
        d="m247 50 31 20v173l195-73 29 20-255 105V50Z"
        fill="#19212b"
        stroke="#43515f"
        strokeWidth=".8"
      />
      <path
        d="m187 370 30 19 285-119v-80l-29-20v80L187 370Z"
        fill="url(#lux-edge)"
        stroke="#a6b6c5"
        strokeWidth=".8"
      />
      <path
        d="M187 75v295l286-120M192 78v284l276-116"
        stroke="#dce5ee"
        strokeOpacity=".55"
        strokeWidth=".75"
      />
      <g fill="#b7cada">
        <circle cx="77" cy="305" r="2.5" />
        <circle cx="563" cy="305" r="2.5" />
        <circle cx="320" cy="392" r="2.5" />
      </g>
      <g stroke="#697887" strokeWidth=".7">
        <path d="M175 38v12m-6-6h12M518 357v12m-6-6h12" />
        <path d="M175 60v286M167 60h16M167 346h16" strokeOpacity=".35" />
      </g>
    </svg>
  );
}
