<?php

namespace Tests\Feature;

use App\Models\Rol\Rol;
use App\Models\User\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function test_create_user()
    {

        $role = Rol::create([
            'rol' => 'Test Role',
        ]);

        $userData = [
            'name' => 'Test User',
            'lastname' => 'User Lastname',
            'identification' => '123456789',
            'email' => 'test@example.com',
            'phone' => '1234567890',
            'address' => '123 Test Street',
            'id_rol' => $role->id,
            'password' => 'password',
            'password_confirmation' => 'password'
        ];

        $response = $this->postJson('/api/User/CreateUser', $userData);

        $response->assertStatus(201)
                 ->assertJson(['message' => 'User register Succesful']);

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
            'id_rol' => $role->id,
        ]);
    }

    /** @test */
    public function test_login_user_with_valid_credentials()
    {
        $role = Rol::create([
            'rol' => 'Test Role',
        ]);

        $user = User::create([
            'name' => 'Test User',
            'lastname' => 'User Lastname',
            'identification' => '123456789',
            'email' => 'test@example.com',
            'phone' => '1234567890',
            'address' => '123 Test Street',
            'id_rol' => $role->id,
            'password' => Hash::make('password')
        ]);

        $credentials = [
            'email' => 'test@example.com',
            'password' => 'password'
        ];

        $response = $this->postJson('/api/User/Login', $credentials);

       // Verificar que la respuesta sea exitosa
       $response->assertStatus(200);

       // Verificar que el token de acceso esté presente
       $response->assertJsonStructure(['access_token', 'token_type', 'user']);

         // Verificar que el usuario devuelto sea el correcto
         $response->assertJsonFragment([
            'id' => $user->id,
            'email' => $user->email,
        ]);
    }

    /** @test */
    public function test_login_user_with_invalid_credentials()
    {
         // Datos de inicio de sesión inválidos
         $credentials = [
            'email' => 'noexist@example.com',
            'password' => 'wrongpassword',
        ];

        // Llamar a la ruta que intenta iniciar sesión con credenciales incorrectas
        $response = $this->postJson('/api/User/Login', $credentials);

        // Verificar que la respuesta indique credenciales incorrectas
        $response->assertStatus(401)
            ->assertJson(['message' => 'Credenciales incorrectas']);
    }


}
