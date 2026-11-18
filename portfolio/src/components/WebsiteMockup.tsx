type WebsiteMockupProps = {
  variant?: "streetfood" | "beauty" | "senior" | "brand";
  compact?: boolean;
};

const variantLabels = {
  streetfood: "Streetfood",
  beauty: "Beauty Studio",
  senior: "Technikhilfe",
  brand: "Personal Brand",
};

export default function WebsiteMockup({
  variant = "streetfood",
  compact = false,
}: WebsiteMockupProps) {
  return (
    <div
      className={`website-mockup website-mockup-${variant} ${
        compact ? "website-mockup-compact" : ""
      }`}
      aria-hidden="true"
    >
      <div className="website-window-bar">
        <span />
        <span />
        <span />
        <i>{variantLabels[variant]}</i>
      </div>
      <div className="website-mockup-hero">
        <div>
          <b />
          <strong>{variantLabels[variant]}</strong>
          <p />
        </div>
        <em />
      </div>
      <div className="website-mockup-body">
        <div className="website-mockup-panel">
          <span />
          <span />
          <span />
        </div>
        <div className="website-mockup-list">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="website-mockup-phone">
        <span />
        <i />
        <i />
      </div>
    </div>
  );
}
