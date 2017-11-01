class Color:
    def __init__(self, r, g, b):
        def checkNum( n):
            if n < 0:
                n = 0
            elif n > 255:
                n = 255
            return n

        self.R = checkNum(r)
        self.G = checkNum(g)
        self.B = checkNum(b)

    

    def getR(self):
        return self.R

    def getG(self):
        return self.G

    def getB(self):
        return self.B

    def toString(self):
        string = 'R' + str(self.R) + 'G' + str(self.G) + 'B' + str(self.B)
        return string

    def getBrightness(self):
        Y = 0.299*self.R + 0.587*self.G + 0.114*self.B
        return Y

p1 = Color(355, -2, 73)
print(p1.getR())
print(p1.getG())
print(p1.getB())
print(p1.toString())
print(p1.getBrightness())
