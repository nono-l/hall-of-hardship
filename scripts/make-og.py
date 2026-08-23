from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1792, 1008
im = Image.new("RGB", (W, H), "#141210")
d = ImageDraw.Draw(im)

candidates = [
    "/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc",
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc",
    "/usr/share/fonts/truetype/droid/DroidSansFallbackFull.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
]
font_path = next((p for p in candidates if os.path.exists(p)), None)
if not font_path:
    raise SystemExit("no font")

# TTC index 0 is typically Japanese/CJK unified
def load(size):
    try:
        return ImageFont.truetype(font_path, size, index=0)
    except TypeError:
        return ImageFont.truetype(font_path, size)

title = load(88)
sub = load(34)
small = load(22)

d.rectangle((80, 140, 700, 860), fill="#1d1a16")
d.rectangle((120, 190, 660, 430), fill="#6b7380")
d.text((150, 230), "公式", font=small, fill="#dce1e8")
d.text((150, 280), "情報共有", font=sub, fill="#dce1e8")
d.text((150, 330), "不足", font=sub, fill="#dce1e8")

d.polygon([(720, 200), (1680, 160), (1700, 900), (700, 880)], fill="#ece6d8")
d.polygon([(900, 240), (1680, 210), (1690, 520), (880, 540)], fill="#d9d0be")

d.ellipse((1380, 240, 1620, 480), outline="#8b3a32", width=8)
d.ellipse((1470, 330, 1530, 390), fill="#8b3a32")

d.text((180, 740), "本当の苦労館", font=title, fill="#ece6d8")
d.text((180, 850), "マイルドな言葉が隠す現場", font=sub, fill="#9a9186")

im.save("/tmp/kurou-og-raw.png")
print("wrote raw")
