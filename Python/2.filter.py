def filterIterable(iterable, predicat):
    for item in iterable:
        if predicat(item): yield item

numbers = [4, 7, 10, 3, 6, 8, 1, 2]
def isPositive(num):
   return num>3 

result = filterIterable(numbers, isPositive)

for i in result:
    print(i)


