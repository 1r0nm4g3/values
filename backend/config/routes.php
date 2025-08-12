<?php
declare(strict_types=1);

use Slim\App;
use App\Controllers\JournalController;

return function (App $app): void {
    $app->get('/api/v1/journal/prompts', [JournalController::class, 'getPrompts']);
    $app->get('/api/v1/journal/prompt/{id}', [JournalController::class, 'getPrompt']);
    $app->post('/api/v1/journal/prompt/{id}', [JournalController::class, 'submitPrompt']);
};
