#!/bin/bash

set -euo pipefail

echo "--- starting application"
./mvnw clean spring-boot:run