def myRange(*args):
    start = None
    stop = None
    step = None

    if len(args) == 1:
        start = 0
        stop = args[0]
        while start<stop:
            yield start
            start+=1
    elif len(args) == 2:
        start = args[0]
        stop = args[1]
        while start<stop:
            yield start
            start+=1
    elif len(args) == 3 and args[2] > 0:
        start = args[0]
        stop = args[1]
        step = args[2]
        while start<stop:
            yield start
            start+=step
    else:
        print('Wrong arguments count')


"Testing function myRange"
for i in myRange(5):
    print(i)
print()

for i in myRange(3, 12):
    print(i)
print()

for i in myRange(3, 12, 2):
    print(i)
print()

for i in myRange(3, 12, 2, 6):
    print(i)
print()

for i in myRange(3, 12, -2):
    print(i)
print()


