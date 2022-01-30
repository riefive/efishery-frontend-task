# README Documents

## Create Project
1. With PWA template
- Command: $ npx create-react-app [project-name] --template cra-template-pwa
2. Downgrade React + Install React Form
- Change react + react-dom at package.json from version 17.0.2 to version 16.12.0
3. Install json-reactform
- Command: $ npm install --save json-reactform
4. Install stein-js-client
- Command: $ npm install --save stein-js-client
## Document folder management 
- Folder "components" path for modular react component
- Folder "helpers"path for js libs
- Folder "services" path for api backend
- Folder "stores" path for management store
- Folder "styles" path for css
- Folder "tests" path for unit test
## Running
1. Development
- Command: $ npm start
2. Production
- Command: $ npm run build
- Command: $ npm install -g serve
- Command: $ serve -s build

## Docker
### Development
1. Build
- Command: $ docker build -t sample:dev .
2. Run
- Command: 
  (if command "${PWD}" not run try to use "%cd%")
  $ docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3005:3000 -e CHOKIDAR_USEPOLLING=true sample:dev
  or
  $ docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3005:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    sample:dev
3. Use docker compose
- Command: $ docker-compose up -d --build (to up)
- Command: $ docker-compose stop
### Production
1. Build
- Command: $ docker build -f Dockerfile.production -t sample:production .
2. Run
- Command: $ docker run -it --rm -p 1337:80 sample:production
3. Use docker compose
- Command: $ docker-compose -f docker-compose.production.yml up -d --build (to up)
- Command: $ docker-compose stop