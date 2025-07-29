<?php
declare(strict_types=1);

namespace App\Models;

/**
 * Detailed reflection for a cluster.
 */
class Refinement
{
    public int $id;
    public int $clusterIndex;
    public string $name;
    public string $q1;
    public string $createdAt;
}
