<?php

namespace App\Models\User;

use App\Models\Rol\Rol;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'users';

    protected $fillable = [
        'name',
        'lastname',
        'identification',
        'email',
        'phone',
        'address',
        'id_rol',
        'password'
    ];

    public function role()
    {
        return $this->hasMany(Rol::class, 'id_rol');
    }

}
