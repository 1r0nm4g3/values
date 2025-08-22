<?php
declare(strict_types=1);

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\ClusterService;
use InvalidArgumentException;

class ClusterController
{
    public function __construct(private ClusterService $service) {}

    public function list(Request $request, Response $response): Response
    {
        $clusters = $this->service->list();
        $payload = json_encode(['clusters' => $clusters], JSON_PRETTY_PRINT);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function create(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();
        try {
            $this->service->create((array)$data);
            $response->getBody()->write(json_encode(['success' => true]));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (InvalidArgumentException $e) {
            $response->getBody()->write(json_encode([
                'error' => 'ValidationError',
                'details' => $e->getMessage(),
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }
    }
}
