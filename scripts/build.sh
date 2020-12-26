# Checkout submodule
git submodule foreach git pull origin master

# Goto frontend directory and build files
cd frontend

# Install deps
yarn

# Build
yarn build

# Copy compiled files
cp -r build ../src/interface

# Back to root directory
cd ..
