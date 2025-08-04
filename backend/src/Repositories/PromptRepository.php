<?php
declare(strict_types=1);

namespace App\Repositories;

use PDO;
use App\Models\Prompt;

class PromptRepository
{
    public function __construct(private PDO $pdo) {}

    /**
     * @return Prompt[]
     */
    public function fetchAll(): array
    {
        $stmt = $this->pdo->query('SELECT id, q1, q2, q3, created_at AS createdAt FROM value_prompts ORDER BY id');
        return $stmt->fetchAll(PDO::FETCH_CLASS, Prompt::class);
    }

    public function insert(Prompt $prompt): int
    {
        $stmt = $this->pdo->prepare('INSERT INTO value_prompts (q1, q2, q3) VALUES (:q1, :q2, :q3)');
        $stmt->execute([
            'q1' => $prompt->q1,
            'q2' => $prompt->q2,
            'q3' => $prompt->q3,
        ]);
        return (int)$this->pdo->lastInsertId();
    }
}
