# Docker tutorial

DevOps with Node.js & Express  
https://youtu.be/9zUHg7xjIqQ?t=3982

`docker run -d -v "$(pwd)":/app:ro -v /app/node_modules -p 3000:4000 --env-file ./.env --name node-app node-app-image`
