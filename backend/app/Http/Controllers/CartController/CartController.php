<?php

namespace App\Http\Controllers\CartController;

use App\Http\Controllers\Controller;
use App\Models\CartSong\CartSong;
use App\Models\CartVinyl\CartVinyl;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addCartSong(Request $request)
{
    $userId = $request->input('user_id');
    $songId = $request->input('song_id');

    $existingCart = CartSong::where('user_id', $userId)
        ->where('song_id', $songId)
        ->first();

    if ($existingCart) {
        $existingCart->quantity += 1;
        $existingCart->save();
        return response()->json(['message' => 'Quantity updated successfully'], 200);
    } else {
        $cartSong = new CartSong([
            'user_id' => $userId,
            'song_id' => $songId,
            'quantity' => 1
        ]);
        $cartSong->save();
        return response()->json(['message' => 'Cart created successfully'], 201);
    }
}

public function addCartVinyl(Request $request)
{
    $userId = $request->input('user_id');
    $vinylId = $request->input('vinyl_id');

    $existingCart = CartVinyl::where('user_id', $userId)
        ->where('vinyl_id', $vinylId)
        ->first();

    if ($existingCart) {
        $existingCart->quantity += 1;
        $existingCart->save();
        return response()->json(['message' => 'Quantity updated successfully'], 200);
    } else {
        $cartVinyl = new CartVinyl([
            'user_id' => $userId,
            'vinyl_id' => $vinylId,
            'quantity' => 1
        ]);
        $cartVinyl->save();
        return response()->json(['message' => 'Cart created successfully'], 201);
    }
}

    public function getCartSong($id)
    {
        $songcart = CartSong::where('user_id', $id)
            ->get();
        $songcart->load('user');
        $songcart->load('song');
        return $songcart;
    }

    public function songcartbyid($id)
    {
        $songcart = CartSong::find($id);
        return $songcart;
    }

    public function getCartVinyl($id)
    {
        $vinylcart = CartVinyl::where('user_id', $id)
            ->get();
        $vinylcart->load('user');
        $vinylcart->load('vinyldisc');
        return $vinylcart;
    }

    public function vinylcartbyid($id)
    {
        $vinylcart = CartVinyl::find($id);
        return $vinylcart;
    }
}
