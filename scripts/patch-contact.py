from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src/pages/ContactPage.jsx"
s = p.read_text(encoding="utf-8")

start = s.find("      {/* Hero */}")
end = s.find("      {/* Main */}")
if start == -1 or end == -1:
    raise SystemExit("markers not found")

new = """      <PageHero
        eyebrow="Get in Touch"
        title={
          <>
            We'd love to
            <br />
            <em className="italic text-[#C9A96E] font-light">hear from you.</em>
          </>
        }
        subtitle="Questions, collaborations, or just want to talk scent — we're here for all of it."
        image={siteImages.contactHero}
        imageAlt={siteImages.contactAccentAlt}
      />

"""

p.write_text(s[:start] + new + s[end:], encoding="utf-8")
print("patched contact")
