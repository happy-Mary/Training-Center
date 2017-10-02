a = int(input('Enter first number: '))
b = int(input('Enter second number: ')) 

if a%2 == 0 and b%2 == 0:
    print(a * b)
elif a%2 != 0 and b%2 != 0:
    print(a + b)
else:
    x = a if a%2 != 0 else b
    print(x)
