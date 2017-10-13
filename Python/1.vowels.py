def checkVowels(string_user):
    string_user = string_user.lower()
    vowelsLat = 'aeiouy'
    vowels = 0

    for letter in string_user:
        if letter in vowelsLat:
            print(letter)
            vowels+=1

    print('Wovels in your string: ', vowels)

string = input('Enter string: ')
checkVowels(string)