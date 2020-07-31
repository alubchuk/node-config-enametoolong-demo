import os

print(str(os.pathconf('/', 'PC_PATH_MAX')) + ":" + str(os.pathconf('/', 'PC_NAME_MAX')));
