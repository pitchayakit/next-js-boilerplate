FROM node:18.17-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy app source code
COPY . .

RUN npm install

# Add the entrypoint script
COPY entrypoint.sh /usr/src/app
RUN chmod +x /usr/src/app/entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

# Exports
CMD ["npm", "run", "dev"]

