<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branch extends Model
{
    protected $table = 'branches';

    protected $fillable = [
        'name',
        'address',
        'phone_number',
        'email',
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'branch_id');
    }
}
