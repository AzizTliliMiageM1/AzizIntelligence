from PIL import Image, ImageOps
import numpy as np

img = Image.open('photo_profile.png').convert('RGB')
arr = np.array(img)

# Estimate background tone from image corners.
corners = np.array([arr[0, 0], arr[0, -1], arr[-1, 0], arr[-1, -1]])
background = tuple(np.median(corners, axis=0).round().astype(int))

# Detect non-background content using a tolerance from the grey/white background.
mask = np.abs(arr - np.array(background)).sum(axis=2) > 36
ys, xs = np.where(mask)
if len(xs) == 0 or len(ys) == 0:
    raise RuntimeError('Could not locate a valid subject area')

# Crop the subject from current raw file and keep enough margin.
x0, x1 = xs.min(), xs.max()
y0, y1 = ys.min(), ys.max()
x0 = max(0, x0 - 10)
y0 = max(0, y0 - 10)
x1 = min(img.width - 1, x1 + 10)
y1 = min(img.height - 1, y1 + 10)

crop = img.crop((x0, y0, x1 + 1, y1 + 1))

# Place the crop in a new centered square canvas.
canvas = Image.new('RGB', img.size, background)
left = (img.width - crop.width) // 2
upper = (img.height - crop.height) // 2
canvas.paste(crop, (left, upper))

# Apply a neutral monochrome transformation.
canvas = ImageOps.grayscale(canvas)
canvas = canvas.convert('RGB')
canvas.save('photo_profile.png')

print(f'Photo rebuilt: crop bbox={(x0, y0, x1, y1)} centered at {(left, upper)}')
