FROM node:16
WORKDIR /nodejs-lab

ENV DB mongo
ENV NODE_ENV development
ENV MONGO_DB_URL mongodb+srv://nodejslab:<password>@nodejslab.lxilr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

COPY package*.json ./
COPY tsconfig.json ./
COPY .eslintrc.json ./
COPY src /nodejs-lab/src
COPY credentials /nodejs-lab/credentials

RUN ls -a

RUN npm install

EXPOSE 3000

COPY . /nodejs-lab

RUN npm run build

CMD ["npm", "run", "start" ]

