<?php

namespace App\Models\Rol;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $table = 'rol';

    protected $fillable = [
        'rol'
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'id_rol');
    }
}
