<?php
declare(strict_types=1);

namespace App\Services;

use App\Repositories\ValueBinRepository;
use App\Models\ValueBin;
use InvalidArgumentException;

class ValueBinService
{
    public function __construct(private ValueBinRepository $repo) {}

    /**
     * @return ValueBin[]
     */
    public function list(): array
    {
        return $this->repo->fetchAll();
    }

    /**
     * @param array{items: array<int, array{value:string, bin:int}>} $data
     */
    public function create(array $data): void
    {
        if (!isset($data['items']) || !is_array($data['items'])) {
            throw new InvalidArgumentException('items required');
        }

        $bins = [];
        foreach ($data['items'] as $item) {
            $value = trim((string)($item['value'] ?? ''));
            $bin = (int)($item['bin'] ?? 0);
            if ($value === '' || $bin < 1 || $bin > 4) {
                throw new InvalidArgumentException('Invalid bin entry');
            }
            $binObj = new ValueBin();
            $binObj->value = $value;
            $binObj->bin = $bin;
            $bins[] = $binObj;
        }
        $this->repo->insertMany($bins);
    }
}
