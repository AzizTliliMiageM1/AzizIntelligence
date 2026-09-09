from PIL import Image
import numpy as np

img = Image.open('photo_profile.png').convert('RGB')
arr = np.array(img)
print('size:', img.size)
# sample non-background mask based on distance from the exact dominant grey background.
# compute background estimate from corners
corners = np.array([arr[0,0], arr[0,-1], arr[-1,0], arr[-1,-1]])
background = np.median(corners, axis=0)
print('background:', background)
mask = np.abs(arr-background).sum(axis=2) > 40
ys, xs = np.where(mask)
print('mask bbox:', xs.min(), xs.max(), ys.min(), ys.max())
print('rows:', arr.shape[0], 'cols:', arr.shape[1])
# print sample bounding box of dark/gray face pixels
gray = arr.mean(axis=2)
bbox = np.argwhere(gray < 150)
if len(bbox):
    print('dark bbox:', bbox[:,1].min(), bbox[:,1].max(), bbox[:,0].min(), bbox[:,0].max())
else:
    print('no dark bbox')
