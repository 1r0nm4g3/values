<?php
declare(strict_types=1);

namespace App\Services;

use App\Repositories\PromptRepository;
use App\Models\Prompt;
use InvalidArgumentException;

class PromptService
{
    public function __construct(private PromptRepository $repo) {}

    /**
     * @return Prompt[]
     */
    public function list(): array
    {
        return $this->repo->fetchAll();
    }

    /**
     * @param array{q1:string,q2:string,q3:string} $data
     */
    public function create(array $data): int
    {
        $q1 = trim((string)($data['q1'] ?? ''));
        $q2 = trim((string)($data['q2'] ?? ''));
        $q3 = trim((string)($data['q3'] ?? ''));
        if ($q1 === '' || $q2 === '' || $q3 === '') {
            throw new InvalidArgumentException('All questions required');
        }
        $prompt = new Prompt();
        $prompt->q1 = $q1;
        $prompt->q2 = $q2;
        $prompt->q3 = $q3;
        return $this->repo->insert($prompt);
    }
}
