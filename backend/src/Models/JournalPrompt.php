<?php
declare(strict_types=1);

namespace App\Models;

use JsonSerializable;

class JournalPrompt implements JsonSerializable
{
    public int $id;
    public string $prompt;

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'prompt' => $this->prompt,
        ];
    }
}
