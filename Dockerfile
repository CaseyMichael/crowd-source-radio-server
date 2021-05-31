#
# Build Stage
# 
FROM openjdk:16.0.1-jdk-slim as builder

WORKDIR /app

COPY .scripts/ .scripts
COPY .k8s/ .k8s
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline -q

COPY src ./src
RUN ./mvnw package -DskipTests -q

#
# Package Stage
# 
FROM openjdk:16.0.1-jdk-slim
COPY --from=builder /app/target/crowdsourceradio.jar crowdsourceradio.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "crowdsourceradio.jar" ]