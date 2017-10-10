def checkVowels(string_user):
    string_user = string_user.lower()
    vowelsLat = 'aeiouy'
    vowels = 0

    for letter in string_user:
       for vowel in vowelsLat:
            if letter is vowel:
                print(letter)
                vowels+=1

#    for vowel in vowelsLat:
#        count = string_user.count(vowel)
#        vowels += count

    print('Wovels in your string: ', vowels)

def askForString():
    string = input('Enter string: ')
    if len(string) <= 0:
        print(len(string))
        askForString()
    else:
        checkVowels(string)


askForString()