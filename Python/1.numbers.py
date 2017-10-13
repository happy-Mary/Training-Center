def getNum(a, b):
    
    if not isinstance(a, int) or not isinstance(b, int):
        return 'Not numbers'
    a_rest = a%2 == 0
    b_rest = b%2 == 0

    if a_rest and b_rest:
        return a * b
    elif not a_rest and not b_rest:
        return a + b
    else:
        x = a if a_rest else b
        return x
    


print(getNum(2, 4))
print(getNum(7, 3))
print(getNum(7, 4))
print(getNum(4, 9))
print(getNum('b', 9))
print(getNum(4, 'c'))
print(getNum('f', 'd'))
