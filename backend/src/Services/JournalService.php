<?php
declare(strict_types=1);

namespace App\Services;

use App\Repositories\JournalPromptRepository;
use App\Repositories\JournalResponseRepository;
use App\Models\JournalPrompt;

class JournalService
{
    public function __construct(
        private JournalPromptRepository $promptRepo,
        private JournalResponseRepository $responseRepo
    ) {
    }

    /** @return JournalPrompt[] */
    public function getPrompts(): array
    {
        return $this->promptRepo->getAll();
    }

    public function getPrompt(int $id): ?JournalPrompt
    {
        return $this->promptRepo->getById($id);
    }

    public function addResponse(int $journalId, int $userId, string $response): void
    {
        $this->responseRepo->insert($journalId, $userId, $response);
    }
}
