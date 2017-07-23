# MetrologicalStandard

# 初始化
* 环境要求：vs2015 + python2.7
* 在当前目录下运行npm install 
* cd .\node_modules\sqlite3\
* npm run prepublish
* node-gyp configure --module_name=node_sqlite3 --module_path=../lib/binding/electron-v1.6-win32-x64
* node-gyp rebuild --target=1.6.11 --arch=x64 --target_platform=win32 --dist-u
rl=https://atom.io/download/electron/ --module_name=node_sqlite3 --module_path=../lib/binding/electron-v1.6-win32-x64
* npm run watch 
* npm run start
