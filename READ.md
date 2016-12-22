# nodejs_server

nodejs server to send sense-hat data with websocket

Background of the Raspberry Pi that was used
Raspberry Pi 2 B with Raspbian Jessie 

To use the server application follow the steps below 

1. install nodejs (the pi is installe with v6.9.2)
  wget https://nodejs.org/dist/v4.0.0/node-v4.0.0-linux-armv7l.tar.gz 
  tar -xvf node-v4.0.0-linux-armv7l.tar.gz 
  cd node-v4.0.0-linux-armv7l
  sudo cp -R * /usr/local/

2. install nodeimu (for reading seneshat) 
  git clone https://github.com/rupnikj/nodeimu --recursive && cd nodeimu
  npm install node-gyp -g
  npm install
  
3. clone this repository at the same level as nodeimu
4. Test 
  cd nodejs-server
  node test.js or node server.js  


  
