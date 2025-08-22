<?php
declare(strict_types=1);

use DI\Container;
use Slim\Factory\AppFactory;
use Dotenv\Dotenv;

require __DIR__ . '/../vendor/autoload.php';

// Load environment
if (file_exists(__DIR__ . '/../.env')) {
    Dotenv::createImmutable(__DIR__ . '/..')->load();
}

$container = new Container();
$settings = require __DIR__ . '/../config/settings.php';
$container->set('settings', $settings['settings']);

$dependencies = require __DIR__ . '/../config/dependencies.php';
$dependencies($container);

AppFactory::setContainer($container);
$app = AppFactory::create();

$errorMiddleware = $app->addErrorMiddleware(
    $settings['settings']['displayErrorDetails'],
    true,
    true
);

$routes = require __DIR__ . '/../config/routes.php';
$routes($app);

$app->addBodyParsingMiddleware();
$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type')
        ->withHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
});
$app->addRoutingMiddleware();

$app->run();
