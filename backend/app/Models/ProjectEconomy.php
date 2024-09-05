<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectEconomy extends Model
{
    use HasFactory;

    public function project()
    {
        return $this->hasMany(Project::class);
    }

    public function economy()
    {
        return $this->belongsTo(Economy::class);
    }

}
