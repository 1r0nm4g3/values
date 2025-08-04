<?php
declare(strict_types=1);

namespace App\Models;

/**
 * Represents a single value placed into a bin.
 */
class ValueBin
{
    public int $id;
    public string $value;
    public int $bin;
    public string $createdAt;
}
