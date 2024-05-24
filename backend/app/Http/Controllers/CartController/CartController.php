<?php

namespace App\Http\Controllers\CartController;

use App\Http\Controllers\Controller;
use App\Models\Cart\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addCart(Request $request)
    {

        $userId = $request->input('user_id');
        $songId = $request->input('song_id');

        $existingCart = Cart::where('user_id', $userId)
            ->where('song_id', $songId)
            ->first();

        if ($existingCart) {
            $existingCart->delete();
            return response()->json(['message' => 'Cart deleted successfully'], 200);
        } else {
            $favorite = new Cart($request->all());
            $favorite->save();
            return response()->json(['message' => 'Cart created successfully'], 201);
        }
    }
}
