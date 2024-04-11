FROM ubuntu:latest as configuration

WORKDIR /config

ARG BASE_URL=http://localhost:45775

RUN echo VITE_API_URL=${BASE_URL} > .env


FROM node:latest as build

WORKDIR /src

COPY ./frontend .
COPY --from=configuration /config .

RUN npm i
RUN npm run build


FROM python:latest

WORKDIR /app

COPY ./api/requirements.txt .
RUN pip3 install -r ./requirements.txt

COPY ./api .

COPY --from=build /src/dist ./static

ENV TEMPLATER_HOSTNAME=0.0.0.0
ENV TEMPLATER_PORT=45775
ENV TEMPLATER_DATABASE=/app/database.db
ENV TEMPLATER_STATIC=/app/static

CMD ["python3", "/app/main.py"]