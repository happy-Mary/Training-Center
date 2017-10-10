def concatStr(*args, separator = " "):
    result = ''
    for item in args: 
        result += str(item) + separator
    return result

print(concatStr('we', 'are', 'great'))
print(concatStr('we', 'are', 'great', separator = "+"))
print(concatStr('we', 4, 'great'))

