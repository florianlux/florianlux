export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-12">
      <p className="text-center text-xs text-faint/60">
        © {new Date().getFullYear()} Florian Lux
      </p>
    </footer>
  );
}
