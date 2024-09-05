<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Economy extends Model
{
    use HasFactory;

    public function projecteconomy()
    {
        return $this->belongsTo(ProjectEconomy::class);
    }
}
