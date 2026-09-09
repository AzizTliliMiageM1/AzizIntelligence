from PIL import Image
import numpy as np

img = Image.open('page-1.png').convert('RGB')
arr = np.array(img)

# focus on the visible CV left-top page area where the profile photo is drawn
# region of interest is near x=0..380 and y=0..260 because the page header title starts later.
small = arr[0:260, 0:380]
# convert luminance and isolate dark figure tones (photo/hair) versus page background.
# We use threshold on luminance and pre-filter the target photo zone.
mask = small.mean(axis=2) < 150
ys, xs = np.where(mask)
if len(xs) and len(ys):
    print('target photo bbox for photo dark pixels:', xs.min(), ys.min(), xs.max(), ys.max())
    # print bbox in page coordinates.
    print('target page absolute bbox:', xs.min(), ys.min(), xs.max(), ys.max())
else:
    print('no dark photo bbox detected')

# create crop rectangle around the detected region, then export square normalized image.
x0 = max(0, xs.min()-5)
y0 = max(0, ys.min()-5)
x1 = min(img.width, xs.max()+6)
y1 = min(img.height, ys.max()+6)
print('crop rectangle:', (x0, y0, x1, y1))

photo = img.crop((x0, y0, x1, y1))
# make it absolutely square and centered
photo = photo.resize((260, 260), Image.Resampling.LANCZOS)
photo = photo.convert('L')
photo = photo.convert('RGB')
photo.save('photo_profile.png')
print('rebuilt photo_profile.png')
