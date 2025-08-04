<?php
declare(strict_types=1);

use Slim\App;
use App\Controllers\ValueBinController;
use App\Controllers\ClusterController;
use App\Controllers\PromptController;
use App\Controllers\RefinementController;

return function (App $app): void {
    $app->group('/api/v1', function (App $group) {
        $group->get('/bins', ValueBinController::class . ':list');
        $group->post('/bins', ValueBinController::class . ':create');

        $group->get('/clusters', ClusterController::class . ':list');
        $group->post('/clusters', ClusterController::class . ':create');

        $group->get('/prompts', PromptController::class . ':list');
        $group->post('/prompts', PromptController::class . ':create');

        $group->get('/refinements', RefinementController::class . ':list');
        $group->post('/refinements', RefinementController::class . ':create');
    });
};
