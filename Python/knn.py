raw = (("orange", 1.0, 1.1),
        ("orange", 1.0, 2.0),
        ("orange", 2.0, 1.0),
        ("orange", 2.0, 2.1),
        ("orange", 3.1, 1.0),
        ("orange", 3.0, 2.1),
        ("orange", 4.0, 2.0),
        ("orange", 4.0, 3.2),
        ("orange", 2.0, 4.3),
        ("orange", 3.0, 4.1),
        ("orange", 3.0, 3.1),
        ("grapefruit", 6.2, 8.5),
        ("grapefruit", 7.0, 7.0),
        ("grapefruit", 7.2, 8.0),
        ("grapefruit", 7.0, 9.0),
        ("grapefruit", 7.5, 8.5),
        ("grapefruit", 8.0, 7.0),
        ("grapefruit", 8.2, 8.0),
        ("grapefruit", 8.0, 9.0),
        ("grapefruit", 8.5, 8.6))


def classify(data, x=0.0, y=0.0, k=3):
    l = sorted([(t[0], (x-t[1]) ** 2 + (y - t[2]) ** 2) for t in data], key=lambda p: p[1])[:k]
    d = {}
    for name, _ in l:
        d[name] = d.get(name, 0) + 1
    return sorted(d.items(), key=lambda x:-x[1])[0][0]


while True:
    x = float(input("X = "))
    y = float(input("Y = "))
    print(classify(raw, x, y, 3))
