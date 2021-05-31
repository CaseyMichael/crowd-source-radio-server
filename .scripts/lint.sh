#!/bin/bash

set -euo pipefail

echo "--- running spotbugs"
./mvnw spotbugs:spotbugs
./mvnw spotbugs:check