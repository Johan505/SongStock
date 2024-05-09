<?php

namespace App\Http\Controllers\RolController;

use App\Http\Controllers\Controller;
use App\Models\Rol\Rol;
use Illuminate\Http\Request;

class RolController extends Controller
{
    public function createRol(Request $request)
    {

        // Crear el nuevo rol
        $rol = Rol::create($request->all());

        // Devolver una respuesta
        return response()->json(['message' => 'Rol creado exitosamente','rol' => $rol], 201);
    }

}
