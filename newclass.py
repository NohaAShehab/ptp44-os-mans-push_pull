
class Std:
    students = []
    def __init__(self, username):
        self.username = username
        Std.students.append(self)


std1 = Std('John')
std = Std('Jack')

print(Std.students)

res = map(lambda x:x.username, Std.students)
print(list(res))


