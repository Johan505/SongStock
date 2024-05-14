<?php

namespace App\Http\Controllers\VinylDiscController;

use App\Http\Controllers\Controller;
use App\Http\Requests\VinylDisc\ReqVinylDisc;
use App\Models\VinylDisc\VinylDisc;
use Illuminate\Http\Request;

class VinylDiscController extends Controller
{
    public function getAllVinylDisc()
    {
        $vinylDisc = VinylDisc::all();
        return $vinylDisc;
    }

    //
    public function createVinylDisc(ReqVinylDisc $request)
    {

        // La validación se maneja automáticamente por Laravel
        $vinyldiscData = $request->all();

        VinylDisc::create($vinyldiscData);

        return response()->json(['message' => 'Vinyl Disc register Succesful'], 201);
    }

    // Función para editar un registro existente
    public function updateVinylDisc(ReqVinylDisc $request, $id)
    {
        // Recupera el registro existente
        $vinylDisc = VinylDisc::findOrFail($id);

        // Aplica las validaciones
        $validatedData = $request->validated();

        // Actualiza los datos del registro
        $vinylDisc->update($validatedData);

        return response()->json(['message' => 'Vinyl Disc updated Succesfully'], 200);
    }

    public function showVinylDisc($id)
    {
        $vinylDisc = VinylDisc::find($id);
        return $vinylDisc;
    }

    public function deleteVinylDisc($id)
    {
        $vinylDisc = VinylDisc::destroy($id);
        return $vinylDisc;
    }
}
