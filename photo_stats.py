from PIL import Image
import numpy as np
img = Image.open('page-1.png').convert('RGB')
arr = np.array(img)
for x0,x1,y0,y1 in [(0,260,0,260),(0,260,0,320),(0,340,0,500),(0,500,0,600)]:
    small = arr[y0:y1, x0:x1]
    # Use luminance threshold to find dark photo silhouette region.
    mask = small.mean(axis=2) < 200
    ys, xs = np.where(mask)
    if len(xs) > 0:
        print('area', (x0,x1,y0,y1), 'bbox', x0+xs.min(), y0+ys.min(), x0+xs.max(), y0+ys.max(), 'count', len(xs))
    else:
        print('area', (x0,x1,y0,y1), 'no dark pixels')

# Also inspect the whole image's main dark-bbox.
mask = arr.mean(axis=2) < 160
ys, xs = np.where(mask)
print('whole bbox', xs.min(), ys.min(), xs.max(), ys.max(), 'count', len(xs))
