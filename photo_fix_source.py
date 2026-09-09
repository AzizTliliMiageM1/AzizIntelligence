from PIL import Image, ImageOps

img = Image.open('page-1.png').convert('RGB')
# Deterministic crop from the source CV screenshot: portrait area only.
# This avoids the repeated drift caused by trying to crop the already altered image.
photo = img.crop((40, 15, 280, 270))
# Normalize the crop to the exact 260×260 avatar square used by the HTML.
photo = photo.resize((260, 260), Image.Resampling.LANCZOS)
# Keep requested monochrome visual style and avoid any color bleed.
photo = ImageOps.grayscale(photo)
photo = photo.convert('RGB')
photo.save('photo_profile.png')
print('photo_profile.png rebuilt from source page-1.png')
