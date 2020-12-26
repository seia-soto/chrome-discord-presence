:: Checkout submodule
git submodule foreach git pull origin master

:: Goto frontend directory and build files
cd frontend

:: Install deps
call yarn

:: Build
call yarn build

:: Copy compiled files
xcopy build ..\src\interface /e /i

:: Back to root directory
cd ..
