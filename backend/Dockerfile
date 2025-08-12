FROM php:8.1-cli

RUN docker-php-ext-install pdo_mysql

WORKDIR /app

CMD ["php", "-S", "0.0.0.0:8001", "-t", "public", "public/index.php"]
