<?php
declare(strict_types=1);

namespace App\Models;

/**
 * Group of related values.
 */
class Cluster
{
    public int $id;
    public string $name;
    /** @var string[] */
    public array $values = [];
    public string $createdAt;
}
