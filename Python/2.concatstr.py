def concatStr(*args, separator = " "):
    result = ''
    for item in args: 
        if item is not args[len(args) - 1]:
            result += str(item) + separator
        else:
            result += str(item)
    return result

print(concatStr('we', 'are', 'great'))
print(concatStr('we', 'are', 'great', separator = "+"))
print(concatStr('we', 4, 'great'))

