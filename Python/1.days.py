def getDay(a):
    if not isinstance(a, int) or not 1<= a <= 365:
        return 'Wrong property: ' + str(a)
        
    x = a%7
    if x == 1 or x == 7:
        return 'Day off ' + str(x)
    else:
        return 'Workday ' + str(x)


print(getDay(275))
print(getDay(12))
print(getDay(8))
print(getDay(5))
print(getDay(2.4))
print(getDay(500))
print(getDay(-6))
print(getDay('a'))