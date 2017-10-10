"ssking user for numbers"
def getNumbers():
    numbers = []
    num = None
    while num != "end":
        x = input('Enter number, to finish enter word "end" : ')
        if x.isnumeric():
            numbers.append(int(x))
        num = x
    return numbers

"generating list"
def generateNumbers():
    outputNumbers = []
    filtered = filter(lambda x: x%2 == 0 and x > 0, getNumbers())

    for i in map(lambda x: x*10, filtered):
        outputNumbers.append(i)
    print(outputNumbers)

