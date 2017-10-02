def getDay(a):
    if not isinstance(a, int) or not 1<= a <= 365:
        print(None, ' ', a)
        return
        
    x = a%7
    if x is 1 or x is 7:
        print('Day off ', x)
    else:
        print('Workday ', x)


getDay(275)
getDay(12)
getDay(8)
getDay(5)
getDay(2.4)
getDay(500)
getDay(-6)
getDay('a')