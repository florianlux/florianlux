import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function NotFound() {
  return (
    <section className="section-shell flex min-h-[70vh] flex-col items-center justify-center text-center">
      <FadeIn direction="none" duration={0.7}>
        <p
          className="font-mono text-[10px] uppercase text-white/28"
          style={{ letterSpacing: "0.34em" }}
        >
          Not found
        </p>
        <p
          className="mt-4 font-medium text-white"
          style={{
            fontSize: "clamp(4rem, 12vw, 10rem)",
            lineHeight: "0.9",
            letterSpacing: "-0.07em",
          }}
        >
          404
        </p>
        <p className="mt-6 text-[15px] text-white/42">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="premium-button premium-button-secondary mt-10 px-7 text-sm"
        >
          ← Back to home
        </Link>
      </FadeIn>
    </section>
  );
}
