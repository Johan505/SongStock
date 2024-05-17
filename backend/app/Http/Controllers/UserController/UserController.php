<?php

namespace App\Http\Controllers\UserController;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\createUser;
use App\Models\User\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function createUser(createUser $request)
    {

        // La validación se maneja automáticamente por Laravel
        $userData = $request->all();

        // Aplicar hash bcrypt a la contraseña antes de almacenarla
        $userData['password'] = Hash::make($userData['password']);

        User::create($userData);

        return response()->json(['message' => 'User register Succesful'], 201);
    }

    public function loginUser(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        $user = auth()->user();
        $user = User::find($user->id);
        $user->load('role');

        return $this->respondWithTokenAndUser($token, $user);
    }

    protected function respondWithTokenAndUser($token, $user)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => $user,
        ]);
    }




}
