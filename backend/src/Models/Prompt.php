<?php
declare(strict_types=1);

namespace App\Models;

/**
 * Answers to the initial values questions.
 */
class Prompt
{
    public int $id;
    public string $q1;
    public string $q2;
    public string $q3;
    public string $createdAt;
}
