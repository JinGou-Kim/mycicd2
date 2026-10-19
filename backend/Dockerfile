FROM eclipse-temurin:25-jre

WORKDIR /app

COPY myboot-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 80

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
