from PIL import Image
img=Image.open("page-1.png")
crop=img.crop((30,20,260,260))
crop.save("photo_profile.png")
print("done")