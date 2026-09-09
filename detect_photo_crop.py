from PIL import Image
img = Image.open('page-1.png').convert('RGB')
w, h = img.size
pixels = img.load()
xs = []
ys = []

# Try to isolate the face/photo zone by keeping strong non-background dark pixels.
for y in range(h):
    for x in range(w):
        r, g, b = pixels[x, y]
        # comfort threshold: the face/hair/photo is significantly darker than the page background
        if r < 80 and g < 80 and b < 80:
            xs.append(x)
            ys.append(y)

if xs and ys:
    print('bbox_dark', min(xs), min(ys), max(xs), max(ys))

# Also identify a tighter crop by scanning for the right-side CV photo area only
# approximate visible crop from the page screenshot manually:
left = 40
upper = 40
right = 240
lower = 270
crop = img.crop((left, upper, right, lower))
crop = crop.convert('L')
# resize to square and keep the photo portrait visible
crop = crop.resize((260, 260))
crop.save('photo_profile.png')
print('saved_photo_profile', crop.size)
