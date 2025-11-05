#!/bin/bash

echo "🧪 Тест отправки лида в Google Sheets"
echo "========================================"
echo ""

SCRIPT_URL="https://script.google.com/macros/s/AKfycbzBa3YxXaQ-EykNNzpJxjLZEgUst8RK4he_nRS_eMuy0YN3OB0KDDM6dATieVg3JO3-zA/exec"

# Тестовые данные
TEST_DATA='{
  "name": "Тестовый Пользователь",
  "phone": "+1(718) 478-4200",
  "email": "test@kaykovmedia.com",
  "serviceType": "3D Signs",
  "message": "Это тестовый лид для проверки работы формы"
}'

echo "📤 Отправляю тестовые данные..."
echo ""
echo "Данные:"
echo "$TEST_DATA" | jq '.'
echo ""

# Отправка POST запроса
response=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA" \
  "$SCRIPT_URL")

# Разделяем ответ и код статуса
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

echo "📊 Результат:"
echo "HTTP Code: $http_code"
echo ""
echo "Ответ:"
echo "$body" | jq '.' 2>/dev/null || echo "$body"
echo ""

if [ "$http_code" -eq 200 ] || [ "$http_code" -eq 302 ] || [ "$http_code" -eq 0 ]; then
    echo "✅ Запрос отправлен успешно!"
    echo ""
    echo "📋 Проверьте:"
    echo "1. Google Sheet (должна появиться новая строка)"
    echo "2. Почту ktv@kaykovmedia.com (должен прийти email)"
else
    echo "❌ Ошибка при отправке (HTTP Code: $http_code)"
fi
