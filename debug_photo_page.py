from PIL import Image
import numpy as np

img = Image.open('page-1.png').convert('RGB')
arr = np.array(img)
# Inspect likely photo area in the page screenshot
print('size', img.size)
# Look for a dark photo area mask.
for threshold in [90, 120, 150, 180, 210, 240]:
    mask = arr.mean(axis=2) < threshold
    ys, xs = np.where(mask)
    if len(xs) and len(ys):
        print('threshold', threshold, 'bbox', xs.min(), ys.min(), xs.max(), ys.max(), 'count', len(xs))
    else:
        print('threshold', threshold, 'no mask')

# Determine the bbox of near pure-white background page area for non-photo text block.
# and inspect a likely photo crop box from page source: left column top-left area.
for box in [(0,0,260,270),(20,0,280,280),(30,15,280,270),(35,15,260,260),(40,15,280,270)]:
    crop = img.crop(box)
    arr_crop = np.array(crop)
    # bounding box of very dark pixels in a crop
    mask = arr_crop.mean(axis=2) < 180
    ys, xs = np.where(mask)
    if len(xs):
        print('box', box, 'dark bbox on crop', xs.min(), ys.min(), xs.max(), ys.max(), 'count', len(xs))
    else:
        print('box', box, 'no dark bbox')
