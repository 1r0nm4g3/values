<?php
declare(strict_types=1);

namespace App\Repositories;

use App\Models\JournalPrompt;
use PDO;

class JournalPromptRepository
{
    public function __construct(private PDO $pdo)
    {
    }

    /** @return JournalPrompt[] */
    public function getAll(): array
    {
        $stmt = $this->pdo->query('SELECT id, prompt FROM journal_prompts');
        return $stmt->fetchAll(PDO::FETCH_CLASS, JournalPrompt::class);
    }

    public function getById(int $id): ?JournalPrompt
    {
        $stmt = $this->pdo->prepare('SELECT id, prompt FROM journal_prompts WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $stmt->setFetchMode(PDO::FETCH_CLASS, JournalPrompt::class);
        $result = $stmt->fetch();
        return $result ?: null;
    }
}
