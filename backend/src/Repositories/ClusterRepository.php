<?php
declare(strict_types=1);

namespace App\Repositories;

use PDO;
use App\Models\Cluster;

class ClusterRepository
{
    public function __construct(private PDO $pdo) {}

    /**
     * @return Cluster[]
     */
    public function fetchAll(): array
    {
        $clusters = [];
        $stmt = $this->pdo->query('SELECT id, name, created_at AS createdAt FROM clusters ORDER BY id');
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $cluster = new Cluster();
            $cluster->id = (int)$row['id'];
            $cluster->name = $row['name'];
            $cluster->createdAt = $row['createdAt'];
            $cluster->values = [];
            $clusters[$cluster->id] = $cluster;
        }

        if (!$clusters) {
            return [];
        }

        $ids = implode(',', array_keys($clusters));
        $stmt = $this->pdo->query("SELECT cluster_id, value FROM cluster_values WHERE cluster_id IN ($ids)");
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $clusters[(int)$row['cluster_id']]->values[] = $row['value'];
        }

        return array_values($clusters);
    }

    /**
     * @param Cluster[] $clusters
     */
    public function insertMany(array $clusters): void
    {
        $this->pdo->beginTransaction();
        $stmtCluster = $this->pdo->prepare('INSERT INTO clusters (name) VALUES (:name)');
        $stmtValue = $this->pdo->prepare('INSERT INTO cluster_values (cluster_id, value) VALUES (:cluster_id, :value)');
        foreach ($clusters as $cluster) {
            $stmtCluster->execute(['name' => $cluster->name]);
            $clusterId = (int)$this->pdo->lastInsertId();
            foreach ($cluster->values as $value) {
                $stmtValue->execute([
                    'cluster_id' => $clusterId,
                    'value' => $value,
                ]);
            }
        }
        $this->pdo->commit();
    }
}
