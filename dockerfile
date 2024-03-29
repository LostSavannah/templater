FROM node:latest as build

WORKDIR /src

COPY ./frontend .

RUN npm i
RUN npm run build


FROM ubuntu:latest

WORKDIR /app

RUN apt-get update
RUN apt-get install -y python3.10 python3-pip
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get install -y wkhtmltopdf

COPY ./api/requirements.txt .
RUN pip3 install -r ./requirements.txt

COPY ./api .

COPY --from=build /src/dist ./static

ENV TEMPLATER_HOSTNAME=0.0.0.0
ENV TEMPLATER_PORT=45775
ENV TEMPLATER_DATABASE=/app/database.db
ENV TEMPLATER_STATIC=/app/static

CMD ["python3", "/app/main.py"]