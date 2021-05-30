#
# Build Stage
# 
FROM openjdk:16.0.1-jdk-slim as build

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline

COPY src ./src
RUN ./mvnw package

#
# Package Stage
# 
FROM openjdk:16.0.1-jdk-slim
COPY --from=build /app/target/crowdsourceradio.jar /usr/local/lib/crowdsourceradio.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "/usr/local/lib/crowdsourceradio.jar" ]