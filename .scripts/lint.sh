#!/bin/bash

echo "--- running spotbugs"
./mvnw spotbugs:spotbugs
./mvnw spotbugs:check