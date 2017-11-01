

def classify(data, x=0.0, y=0.0, k=3):
    l = sorted([(t[0], (x-t[1]) ** 2 + (y - t[2]) ** 2) for t in data], key=lambda p: p[1])[:k]
    d = {}
    for name, _ in l:
        d[name] = d.get(name, 0) + 1
    return sorted(d.items(), key=lambda x:-x[1])[0][0]

def getFileData():
    f = open("data.txt")
    lines = []
    for line in f:
        line = line.strip('\n').replace('"', '').split(',')
        line[1] = float(line[1])
        line[2] = float(line[2])
        lines.append(line)
    f.close()
    return lines

raw = getFileData()

while True:
    x = float(input("X = "))
    y = float(input("Y = "))
    print(classify(raw, x, y, 3))
