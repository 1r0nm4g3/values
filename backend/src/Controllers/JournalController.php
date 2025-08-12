<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Services\JournalService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class JournalController
{
    public function __construct(private JournalService $service)
    {
    }

    public function getPrompts(Request $request, Response $response): Response
    {
        $prompts = $this->service->getPrompts();
        $response->getBody()->write(json_encode($prompts));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getPrompt(Request $request, Response $response, array $args): Response
    {
        $prompt = $this->service->getPrompt((int) $args['id']);
        if (!$prompt) {
            $response->getBody()->write(json_encode(['error' => 'Prompt not found']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }
        $response->getBody()->write(json_encode($prompt));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function submitPrompt(Request $request, Response $response, array $args): Response
    {
        $data = (array) $request->getParsedBody();
        $text = $data['response'] ?? '';
        $this->service->addResponse((int) $args['id'], 1, $text);
        $response->getBody()->write(json_encode(['status' => 'ok']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
    }
}
