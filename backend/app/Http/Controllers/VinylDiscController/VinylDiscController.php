<?php

namespace App\Http\Controllers\VinylDiscController;

use App\Http\Controllers\Controller;
use App\Http\Requests\VinylDisc\createVinylDisc;
use App\Models\VinylDisc\VinylDisc;
use Illuminate\Http\Request;

class VinylDiscController extends Controller
{
    //
    public function createVinylDisc(createVinylDisc $request)
    {

        // La validación se maneja automáticamente por Laravel
        $vinyldiscData = $request->all();

        VinylDisc::create($vinyldiscData);

        return response()->json(['message' => 'Vinyl Disc register Succesful'], 201);
    }
}
