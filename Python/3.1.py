

def classify(data, x=0.0, y=0.0, k=3):
    l = sorted([(t[0], (x-t[1]) ** 2 + (y - t[2]) ** 2) for t in data], key=lambda p: p[1])[:k]
    d = {}
    for name, _ in l:
        d[name] = d.get(name, 0) + 1
    return sorted(d.items(), key=lambda x:-x[1])[0][0]

def getFileData():
    data = readFile()

# raw = getFileData()

# while True:
#     x = float(input("X = "))
#     y = float(input("Y = "))
#     print(classify(raw, x, y, 3))
