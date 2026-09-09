from PIL import Image
import numpy as np

img = Image.open('page-1.png').convert('RGB')
arr = np.array(img)

regions = [
    (0, 0, 260, 260),
    (20, 10, 260, 260),
    (10, 10, 280, 280),
    (40, 15, 280, 270),
    (30, 20, 260, 260),
]

for coords in regions:
    x0, y0, x1, y1 = coords
    small = arr[y0:y1, x0:x1]
    # Find any sufficiently dark pixels in the photo and surrounding tone.
    mask = small.mean(axis=2) < 200
    ys, xs = np.where(mask)
    if len(xs) > 0:
        print('region', coords, 'bbox_dark', x0+xs.min(), y0+ys.min(), x0+xs.max(), y0+ys.max(), 'count', len(xs))
    else:
        print('region', coords, 'no dark pixels')
