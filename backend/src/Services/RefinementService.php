<?php
declare(strict_types=1);

namespace App\Services;

use App\Repositories\RefinementRepository;
use App\Models\Refinement;
use InvalidArgumentException;

class RefinementService
{
    public function __construct(private RefinementRepository $repo) {}

    /**
     * @return Refinement[]
     */
    public function list(): array
    {
        return $this->repo->fetchAll();
    }

    /**
     * @param array{cluster:int,name:string,q1:string} $data
     */
    public function create(array $data): int
    {
        $cluster = isset($data['cluster']) ? (int)$data['cluster'] : -1;
        $name = trim((string)($data['name'] ?? ''));
        $q1 = trim((string)($data['q1'] ?? ''));
        if ($cluster < 0 || $name === '' || $q1 === '') {
            throw new InvalidArgumentException('Invalid refinement');
        }
        $ref = new Refinement();
        $ref->clusterIndex = $cluster;
        $ref->name = $name;
        $ref->q1 = $q1;
        return $this->repo->insert($ref);
    }
}
