<?php
declare(strict_types=1);

namespace App\Repositories;

use PDO;

class JournalResponseRepository
{
    public function __construct(private PDO $pdo)
    {
    }

    public function insert(int $journalId, int $userId, string $response): void
    {
        $stmt = $this->pdo->prepare('INSERT INTO journal_responses (journal_id, user_id, response) VALUES (:journal_id, :user_id, :response)');
        $stmt->execute([
            'journal_id' => $journalId,
            'user_id' => $userId,
            'response' => $response,
        ]);
    }
}
