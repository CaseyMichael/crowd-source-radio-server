FROM openjdk:16.0.1-jdk-slim

WORKDIR /app

COPY .scripts/ .scripts
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

RUN ./mvnw dependency:go-offline

COPY src ./src