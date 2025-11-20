#!/bin/bash

echo "🚀 Отправка изменений на GitHub..."
echo ""

# Проверяем, есть ли изменения для отправки
if git diff-index --quiet HEAD --; then
    echo "✅ Нет изменений для отправки"
else
    echo "⚠️  Есть незакоммиченные изменения. Сначала закоммитьте их."
    exit 1
fi

# Проверяем статус
AHEAD=$(git rev-list --count origin/main..main 2>/dev/null || echo "0")

if [ "$AHEAD" -eq "0" ]; then
    echo "✅ Все изменения уже отправлены на GitHub"
    exit 0
fi

echo "📦 Коммитов для отправки: $AHEAD"
echo ""

# Пробуем разные способы отправки
echo "Попытка 1: HTTPS (может потребоваться авторизация)..."
if git push origin main 2>&1 | grep -q "Authentication failed\|could not read Username"; then
    echo "❌ HTTPS требует авторизацию"
    echo ""
    echo "Попытка 2: SSH..."
    git remote set-url origin git@github.com:ktv-cmd/Kaykov-Signages-3.git
    if git push origin main 2>&1 | grep -q "Host key verification failed\|Permission denied"; then
        echo "❌ SSH не настроен"
        echo ""
        echo "📝 Используйте один из вариантов из файла PUSH_TO_GITHUB.md"
        echo ""
        echo "Или выполните вручную:"
        echo "  git push origin main"
        exit 1
    else
        echo "✅ Успешно отправлено через SSH!"
        exit 0
    fi
else
    echo "✅ Успешно отправлено через HTTPS!"
    exit 0
fi

