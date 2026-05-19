from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src/pages/HomePage.jsx"
s = p.read_text(encoding="utf-8")

s = s.replace(
    '<img\n            src={siteImages.hero}\n            alt={siteImages.heroAlt}\n            className="w-full h-full object-cover"\n          />',
    '<SafeImage src={siteImages.hero} alt={siteImages.heroAlt} className="absolute inset-0 w-full h-full object-cover" loading="eager" />',
)
s = s.replace(
    'className="relative h-[60vw] lg:h-full min-h-[400px] overflow-hidden"',
    'className="relative order-1 lg:order-2 h-[50vh] sm:h-[55vh] lg:h-full min-h-[300px] lg:min-h-[500px] overflow-hidden bg-[#E8E4DE]"',
)
s = s.replace(
    'pt-32 pb-20 lg:py-0 bg-[#FAF9F7] lg:bg-transparent',
    'order-2 lg:order-1 pt-10 pb-14 lg:pt-32 lg:pb-20 lg:py-0 bg-[#FAF9F7]',
)
s = s.replace(
    '<img\n                  src={siteImages.atelier}\n                  alt={siteImages.atelierAlt}\n                  className="w-full h-full object-cover"\n                />',
    '<SafeImage src={siteImages.atelier} alt={siteImages.atelierAlt} className="w-full h-full object-cover" />',
)
s = s.replace(
    '<motion.div className="aspect-[4/5] overflow-hidden">',
    '<motion.div className="aspect-[4/5] overflow-hidden bg-[#1a1a1a]">',
    1,
)

p.write_text(s, encoding="utf-8")
print("patched HomePage")
