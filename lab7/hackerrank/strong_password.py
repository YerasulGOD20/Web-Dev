numbers = "0123456789"
lower_case = "abcdefghijklmnopqrstuvwxyz"
upper_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
special_characters = "!@#$%^&*()-+"


def minimumNumber(n, password):
    add = 0
    if all(n not in password for n in numbers):
        add += 1

    if all(l not in password for l in lower_case):
        add += 1

    if all(u not in password for u in upper_case):
        add += 1
    if all(s not in password for s in special_characters):
        add += 1

    return add + max(0, 6 - len(password) - add)


if __name__ == "__main__":
    n = int(input().strip())
    password = input().strip()
    answer = minimumNumber(n, password)
    print(answer)