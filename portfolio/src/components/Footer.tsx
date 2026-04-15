export default function Footer() {
  return (
    <footer
      id="footer"
      className="flex items-center justify-between px-6 sm:px-10"
      style={{
        height: "80px",
        borderTop: "1px solid #1A1A22",
      }}
    >
      <span className="font-mono text-[12px]" style={{ color: "#00E5A0" }}>
        FL
      </span>
      <span className="font-mono text-[10px]" style={{ color: "#3A3A45" }}>
        2026
      </span>
    </footer>
  );
}
