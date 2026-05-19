from pathlib import Path
import re

p = Path(__file__).resolve().parents[1] / "src/pages/AboutPage.jsx"
s = p.read_text(encoding="utf-8")

replacement = """      <PageHero
        eyebrow="Est. Lagos, 2018"
        title={
          <>
            Crafting memories,
            <br />
            <em className="italic text-[#C9A96E] font-light">one scent at a time.</em>
          </>
        }
        subtitle="Born in Lagos, Scenture crafts fragrances and home scents that honour tradition while embracing modern luxury."
        image={siteImages.aboutHero}
        imageAlt={siteImages.aboutHeroAlt}
      />"""

pattern = r"      \{/\* ── HERO ──.*?</section>\s*\n"
new_s, n = re.subn(pattern, replacement + "\n\n", s, count=1, flags=re.DOTALL)
if n != 1:
    raise SystemExit(f"hero replace failed: {n}")

new_s = new_s.replace(
    """      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
        loading="lazy"
      />""",
    """      <SafeImage
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
      />""",
)

p.write_text(new_s, encoding="utf-8")
print("patched AboutPage")
