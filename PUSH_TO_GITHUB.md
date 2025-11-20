# Как отправить изменения на GitHub

## Вариант 1: Использовать Personal Access Token (Рекомендуется)

1. Создайте Personal Access Token на GitHub:
   - Перейдите: https://github.com/settings/tokens
   - Нажмите "Generate new token (classic)"
   - Выберите срок действия и права доступа (нужен `repo`)
   - Скопируйте токен

2. Выполните команду (замените YOUR_TOKEN на ваш токен):
   ```bash
   git remote set-url origin https://YOUR_TOKEN@github.com/ktv-cmd/Kaykov-Signages-3.git
   git push origin main
   ```

3. После успешного push, верните обычный URL:
   ```bash
   git remote set-url origin https://github.com/ktv-cmd/Kaykov-Signages-3.git
   ```

## Вариант 2: Использовать GitHub Desktop

1. Установите GitHub Desktop: https://desktop.github.com/
2. Откройте проект в GitHub Desktop
3. Нажмите "Push origin"

## Вариант 3: Настроить SSH ключ

1. Проверьте, есть ли SSH ключ:
   ```bash
   ls -la ~/.ssh
   ```

2. Если ключа нет, создайте:
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

3. Скопируйте публичный ключ:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

4. Добавьте ключ в GitHub:
   - Перейдите: https://github.com/settings/keys
   - Нажмите "New SSH key"
   - Вставьте скопированный ключ

5. Верните SSH URL и отправьте:
   ```bash
   git remote set-url origin git@github.com:ktv-cmd/Kaykov-Signages-3.git
   git push origin main
   ```

## Вариант 4: Использовать готовый скрипт

Запустите скрипт `push-to-github.sh` (см. ниже)

