numbers = []
num = None

while True:
    num = input('Enter number, to finish enter word "end" : ')
    if num == 'end':
        break
    # doesn't checks negative numbers
    elif num.isnumeric():
        print(num)
        numbers.append(int(num))
    else:
        continue

print(numbers)
print(sum(numbers)/len(numbers))




     
