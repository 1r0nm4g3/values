<?php
declare(strict_types=1);

return [
    'settings' => [
        'displayErrorDetails' => getenv('APP_ENV') !== 'production',
        'db' => [
            'host' => getenv('DB_HOST'),
            'port' => getenv('DB_PORT') ?: '3306',
            'dbname' => getenv('DB_NAME'),
            'user' => getenv('DB_USER'),
            'pass' => getenv('DB_PASS'),
        ],
    ],
];
