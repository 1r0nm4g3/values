<?php
declare(strict_types=1);

namespace App\Repositories;

use PDO;
use App\Models\ValueBin;

class ValueBinRepository
{
    public function __construct(private PDO $pdo) {}

    /**
     * @return ValueBin[]
     */
    public function fetchAll(): array
    {
        $stmt = $this->pdo->query('SELECT id, value, bin, created_at AS createdAt FROM value_bins ORDER BY id');
        return $stmt->fetchAll(PDO::FETCH_CLASS, ValueBin::class);
    }

    /**
     * @param ValueBin[] $bins
     */
    public function insertMany(array $bins): void
    {
        $stmt = $this->pdo->prepare('INSERT INTO value_bins (value, bin) VALUES (:value, :bin)');
        foreach ($bins as $bin) {
            $stmt->execute([
                'value' => $bin->value,
                'bin' => $bin->bin,
            ]);
        }
    }
}
