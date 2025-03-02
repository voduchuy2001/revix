<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Revenue extends Model
{
    protected $table = 'revenues';

    protected $fillable = [
        'branch_id',
        'date',
        'amount',
        'content',
    ];

    protected $casts = [
        'amount' => 'float',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class, 'branch_id');
    }
}
