class Picture:
    def __init__(self):
        self.picture = []

    def addPoint(self, x, y, color):
        point = x, y, color
        self.point = tuple(point)
        self.picture.append(self.point)
    
    def deletePoint(self, x, y):
        for item in self.picture:
            if item[0] == x and item[1] == y:
                self.picture.remove(item)

    def getBrightest(self):
        def getBright(t):
            Y = 0.299*t[0] + 0.587*t[1] + 0.114*t[2]
            return Y

        array = sorted(self.picture, key = lambda color: getBright(color[2]))
        return array[-1][0:2]

p1 = Picture()
p1.addPoint(2, 4, (102, 255, 204))
p1.addPoint(14, 20, (255, 0, 0))
p1.addPoint(22, 48, (255, 255, 255))
p1.addPoint(22, 48, (255, 204, 229))
p1.addPoint(35, 9, (0, 0, 204))
p1.deletePoint(2, 4)
brightest = p1.getBrightest()
print(brightest)