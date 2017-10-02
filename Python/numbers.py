def getNum(a, b):
    
    if not isinstance(a, int) or not isinstance(b, int):
        print('Not numbers')
        return

    if a%2 == 0 and b%2 == 0:
        print(a * b)
    elif a%2 != 0 and b%2 != 0:
        print(a + b)
    else:
        x = a if a%2 != 0 else b
        print(x)
    return

getNum(2, 4)
getNum(7, 3)
getNum(7, 4)
getNum(4, 9)
getNum('b', 9)
getNum(4, 'c')
getNum('f', 'd')
