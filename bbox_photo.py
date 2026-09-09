from PIL import Image
img=Image.open("page-1.png").convert("RGB")
w,h=img.size
xs=[]; ys=[]
for y in range(h):
    for x in range(w):
        r,g,b=img.getpixel((x,y))
        if r<180 or g<180 or b<180:
            xs.append(x); ys.append(y)
print(min(xs), min(ys), max(xs), max(ys))