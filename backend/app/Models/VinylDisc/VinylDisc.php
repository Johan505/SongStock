<?php

namespace App\Models\VinylDisc;

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
        'observations'
    ];
}
