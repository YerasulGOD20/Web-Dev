s = input().strip()
ans = 1

for i in s:
    if i in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
        ans += 1

print(ans)
