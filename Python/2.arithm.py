numbers = []
num = None
while num != "end":
    x = input('Enter number, to finish enter word "end" : ')
    if x.isnumeric():
        numbers.append(int(x))
    num = x

print(numbers)

print(sum(numbers)/len(numbers))


     
