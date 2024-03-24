a = input()
b = a[8:10]
if a[0:2] == '12' and a[8:10] == "PM":
    print(a[0:8])
elif a[0:2] == '12' and a[8:10] == "AM":
    num2 = a[2:8]
    num1 = "00"
    print(num1 + num2)
elif b == "PM":
    num1 = a[0:2]
    num2 = a[2:8]
    num3 = str(int(num1)+12)
    print(num3 + num2)
else:
    print(a[0:8])
