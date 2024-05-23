<?php

namespace App\Models\VinylDisc;

<<<<<<< HEAD
use App\Models\User\User;
=======
>>>>>>> Santiago
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VinylDisc extends Model
{
    use HasFactory;

    protected $table = 'vinyldisc';

    protected $fillable = [
        'name',
        'artist',
        'releaseyear',
        'price',
        'amount',
        'img',
        'format',
        'description',
        'state',
        'condition',
<<<<<<< HEAD
        'observations',
        'id_user'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
=======
        'observations'
    ];
>>>>>>> Santiago
}
