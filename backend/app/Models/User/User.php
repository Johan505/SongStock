<?php

namespace App\Models\User;

use App\Models\CartSong\CartSong;
use App\Models\CartVinyl\CartVinyl;
use App\Models\Rol\Rol;
use App\Models\VinylDisc\VinylDisc;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
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
        return $this->belongsTo(Rol::class, 'id_rol');
    }

    public function vinyl()
    {
        return $this->hasMany(VinylDisc::class, 'id_user');
    }

    public function cartsong()
    {
        return $this->hasMany(CartSong::class, 'user_id');
    }

    public function cartvinyl()
    {
        return $this->hasMany(CartVinyl::class, 'user_id');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

}
