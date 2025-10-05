import os

# 指定目录路径
directory = r"C:\Users\l\Documents\GitHub\vds\p\yunran"

# 获取目录下所有文件名
files = os.listdir(directory)

# 过滤出文件（排除目录）
files = [f for f in files if os.path.isfile(os.path.join(directory, f))]

# 按要求格式化输出
for file in files:
    print(f"{{ src: './yunran/{file}', category: 'yunran' }},")