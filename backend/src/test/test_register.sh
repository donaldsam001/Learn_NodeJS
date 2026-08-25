#!/bin/bash

BASE_URL="http://localhost:8000"
ENDPOINT="/app/v1/users/register"

echo "Testing API: POST ${BASE_URL}${ENDPOINT}"
echo "----------------------------------------"

curl -i -X POST "${BASE_URL}${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "donaldsam1",
    "email": "sam1@gmail.com",
    "password": "sam123456"
  }'

echo
echo "----------------------------------------"
echo "Test completed."