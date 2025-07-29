<?php
declare(strict_types=1);

namespace App\Services;

use App\Repositories\ClusterRepository;
use App\Models\Cluster;
use InvalidArgumentException;

class ClusterService
{
    public function __construct(private ClusterRepository $repo) {}

    /**
     * @return Cluster[]
     */
    public function list(): array
    {
        return $this->repo->fetchAll();
    }

    /**
     * @param array{clusters: array<int, array{name:string, values:array<int,string>}>} $data
     */
    public function create(array $data): void
    {
        if (!isset($data['clusters']) || !is_array($data['clusters'])) {
            throw new InvalidArgumentException('clusters required');
        }
        $clusters = [];
        foreach ($data['clusters'] as $c) {
            $name = trim((string)($c['name'] ?? ''));
            $values = $c['values'] ?? [];
            if ($name === '' || !is_array($values)) {
                throw new InvalidArgumentException('Invalid cluster');
            }
            $cluster = new Cluster();
            $cluster->name = $name;
            $cluster->values = array_map('strval', $values);
            $clusters[] = $cluster;
        }
        $this->repo->insertMany($clusters);
    }
}
