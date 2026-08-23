from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1792, 1008
im = Image.new("RGB", (W, H), "#141210")
d = ImageDraw.Draw(im)

candidates = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf",
    "/usr/share/fonts/truetype/liberation2/LiberationSerif-Bold.ttf",
]
font_path = next((p for p in candidates if os.path.exists(p)), None)
if not font_path:
    raise SystemExit("no serif font")

title = ImageFont.truetype(font_path, 88)
sub = ImageFont.truetype(font_path, 34)
small = ImageFont.truetype(font_path, 22)

d.rectangle((80, 140, 700, 860), fill="#1d1a16")
d.rectangle((120, 190, 660, 430), fill="#6b7380")
d.text((150, 230), "OFFICIAL", font=small, fill="#dce1e8")
d.text((150, 280), "Info-sharing", font=sub, fill="#dce1e8")
d.text((150, 330), "deficiency", font=sub, fill="#dce1e8")

d.polygon([(720, 200), (1680, 160), (1700, 900), (700, 880)], fill="#ece6d8")
d.polygon([(900, 240), (1680, 210), (1690, 520), (880, 540)], fill="#d9d0be")

d.ellipse((1380, 240, 1620, 480), outline="#8b3a32", width=8)
d.ellipse((1470, 330, 1530, 390), fill="#8b3a32")

d.text((180, 740), "Hall of Hardship", font=title, fill="#ece6d8")
d.text((180, 850), "Mild words that hide the field", font=sub, fill="#9a9186")

im.save("/tmp/kurou-og-raw.png")
print("wrote raw")
