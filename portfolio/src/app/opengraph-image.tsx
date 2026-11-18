import { ImageResponse } from "next/og";
export const alt =
  "Florian Lux — Developer. Founder. Creative Technologist. One person. Multiple modes.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#080809",
        color: "#F2F1EF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "55px 70px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 19,
          color: "#C4C6CB",
        }}
      >
        <span>MOTION // SWITCH</span>
        <span>2026</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 121,
          letterSpacing: -7,
          fontWeight: 600,
        }}
      >
        FLORIAN LUX<span style={{ color: "#C4C6CB" }}>{" //"}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #40434a",
          paddingTop: 30,
        }}
      >
        <span style={{ fontSize: 28 }}>BUILD / CREATE / EXPLORE</span>
        <span style={{ fontSize: 19, color: "#A3A3A6" }}>
          Developer. Founder. Creative Technologist.
        </span>
      </div>
    </div>,
    size,
  );
}
