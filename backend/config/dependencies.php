<?php
declare(strict_types=1);

use DI\Container;
use PDO;
use App\Repositories\JournalPromptRepository;
use App\Repositories\JournalResponseRepository;
use App\Services\JournalService;
use App\Controllers\JournalController;

return function (Container $container, array $settings): void {
    $container->set(PDO::class, function () use ($settings) {
        $pdo = new PDO(
            $settings['db']['dsn'],
            $settings['db']['user'],
            $settings['db']['pass']
        );
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    });

    $container->set(JournalPromptRepository::class, function ($c) {
        return new JournalPromptRepository($c->get(PDO::class));
    });

    $container->set(JournalResponseRepository::class, function ($c) {
        return new JournalResponseRepository($c->get(PDO::class));
    });

    $container->set(JournalService::class, function ($c) {
        return new JournalService(
            $c->get(JournalPromptRepository::class),
            $c->get(JournalResponseRepository::class)
        );
    });

    $container->set(JournalController::class, function ($c) {
        return new JournalController($c->get(JournalService::class));
    });
};
