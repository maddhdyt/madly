<?php

namespace App\Services\Marketing;

use App\Models\RevenueLog;
use Illuminate\Database\Eloquent\Collection;

class RevenueLogService
{
    public function getAllLogs(): Collection
    {
        return RevenueLog::orderBy('date', 'desc')->get();
    }

    public function createLog(array $data): RevenueLog
    {
        return RevenueLog::create($data);
    }

    public function updateLog(RevenueLog $revenueLog, array $data): bool
    {
        return $revenueLog->update($data);
    }

    public function deleteLog(RevenueLog $revenueLog): ?bool
    {
        return $revenueLog->delete();
    }
}
