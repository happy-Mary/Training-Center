"asking user for numbers"
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
outputNumbers = []

def filterNums():
    indexIterable = 0
    for num in getNumbers():
        if indexIterable%2 is 0:
            print(indexIterable)
            yield num
        indexIterable+=1

for i in map(lambda x: x*10, filterNums()):
    outputNumbers.append(i)

print(outputNumbers)



