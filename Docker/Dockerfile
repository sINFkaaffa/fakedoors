FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Copy package configuration into container
COPY package*.json ./

# Run the installer
RUN npm install

# Copy all local files into the container
COPY . .

RUN chmod +x container-sleep.sh

# Node default port
EXPOSE 3000

# Command to start the container
CMD [ "npm", "start" ]
