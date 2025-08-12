<?php
declare(strict_types=1);

namespace App\Repositories;

use PDO;
use App\Models\Refinement;

class RefinementRepository
{
    public function __construct(private PDO $pdo) {}

    /**
     * @return Refinement[]
     */
    public function fetchAll(): array
    {
        $stmt = $this->pdo->query('SELECT id, cluster_index AS clusterIndex, name, q1, created_at AS createdAt FROM value_refinements ORDER BY id');
        return $stmt->fetchAll(PDO::FETCH_CLASS, Refinement::class);
    }

    public function insert(Refinement $refinement): int
    {
        $stmt = $this->pdo->prepare('INSERT INTO value_refinements (cluster_index, name, q1) VALUES (:cluster_index, :name, :q1)');
        $stmt->execute([
            'cluster_index' => $refinement->clusterIndex,
            'name' => $refinement->name,
            'q1' => $refinement->q1,
        ]);
        return (int)$this->pdo->lastInsertId();
    }
}
