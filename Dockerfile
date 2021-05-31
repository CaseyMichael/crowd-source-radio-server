#
# Build Stage
# 
FROM openjdk:16.0.1-jdk-slim as builder

WORKDIR /app

COPY .scripts/ .scripts
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline -q

COPY src ./src
RUN ./mvnw package -DskipTests -q

#
# Package Stage
# 
FROM openjdk:16.0.1-jdk-slim as package
COPY --from=builder /app/target/crowdsourceradio.jar crowdsourceradio.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "crowdsourceradio.jar" ]

#
# Deploy Stage
#
FROM ubuntu:latest as deploy
COPY .k8s/ .k8s
COPY .scripts/ .scripts

RUN apt-get update
RUN apt-get install -y gettext python apt-transport-https ca-certificates

RUN curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | tee /etc/apt/sources.list.d/kubernetes.list

RUN apt-get update
RUN apt-get install -y kubectl