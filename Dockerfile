#
# Build Stage
# 
FROM openjdk:16.0.1-jdk-slim as build

WORKDIR /app

COPY .scripts/ .scripts
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline

COPY src ./src
RUN ./mvnw package

#
# Package Stage
# 
FROM openjdk:16.0.1-jdk-slim
COPY --from=build /app/target/crowdsourceradio.jar crowdsourceradio.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "crowdsourceradio.jar" ]