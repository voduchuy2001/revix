<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepairTicket extends Model
{
    protected $table = 'repair_tickets';

    protected $fillable = [
        'branch_id',
        'customer_id',
        'device_id',
        'technician',
        'code',
        'amount',
        'note',
        'status',
        'condition',
        'created_by',
        'updated_by',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($ticket) {
            $branchId = $ticket->branch_id;

            $latestCode = self::where('branch_id', $branchId)
                ->where('code', 'LIKE', "#$branchId%")
                ->orderByDesc('code')
                ->value('code');

            $number = $latestCode ? intval(substr($latestCode, strlen("#$branchId"))) + 1 : 1;

            $ticket->code = "#$branchId" . str_pad($number, 7, '0', STR_PAD_LEFT);
        });
    }


    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function device(): BelongsTo
    {
        return $this->belongsTo(Device::class, 'device_id');
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class, 'branch_id');
    }
}
