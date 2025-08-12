<?php
declare(strict_types=1);

use DI\Container;
use App\Repositories\ValueBinRepository;
use App\Repositories\ClusterRepository;
use App\Repositories\PromptRepository;
use App\Repositories\RefinementRepository;
use App\Services\ValueBinService;
use App\Services\ClusterService;
use App\Services\PromptService;
use App\Services\RefinementService;
use Psr\Container\ContainerInterface;

return function (Container $container): void {
    $container->set(PDO::class, function(ContainerInterface $c) {
        $settings = $c->get('settings')['db'];
        $dsn = sprintf('mysql:host=%s;dbname=%s;port=%s;charset=utf8mb4',
            $settings['host'],
            $settings['dbname'],
            $settings['port']
        );
        return new PDO($dsn, $settings['user'], $settings['pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ]);
    });

    $container->set(ValueBinRepository::class, fn(ContainerInterface $c) => new ValueBinRepository($c->get(PDO::class)));
    $container->set(ClusterRepository::class, fn(ContainerInterface $c) => new ClusterRepository($c->get(PDO::class)));
    $container->set(PromptRepository::class, fn(ContainerInterface $c) => new PromptRepository($c->get(PDO::class)));
    $container->set(RefinementRepository::class, fn(ContainerInterface $c) => new RefinementRepository($c->get(PDO::class)));

    $container->set(ValueBinService::class, fn(ContainerInterface $c) => new ValueBinService($c->get(ValueBinRepository::class)));
    $container->set(ClusterService::class, fn(ContainerInterface $c) => new ClusterService($c->get(ClusterRepository::class)));
    $container->set(PromptService::class, fn(ContainerInterface $c) => new PromptService($c->get(PromptRepository::class)));
    $container->set(RefinementService::class, fn(ContainerInterface $c) => new RefinementService($c->get(RefinementRepository::class)));
};
