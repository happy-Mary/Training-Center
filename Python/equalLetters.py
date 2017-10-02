string1 = input('Enter first string: ').lower()
string2 = input('Enter second string: ').lower()

pos1 = 0

for letter1 in string1:
    pos1 += 1
    pos2 = 0
    for letter2 in string2:
        pos2 += 1
        if letter2 is letter1:
            print(letter1, '-первая строка = ', pos1, ', вторая строка = ', pos2)