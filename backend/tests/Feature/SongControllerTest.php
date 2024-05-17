<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class SongControllerTest extends TestCase
{

    use RefreshDatabase;

    /** @test */
    public function test_create_song()
    {

        $songData = [
            'name' => 'Billie Jean',
            'price' => '2000',
            'duration' => '158',
            'mb' => '5',
            'kbps' => '320',
            'gender' => 'kpop',
            'artist' => 'Michael Jackson',
            'img' => 'image',
            'song' => 'song'
        ];

        $response = $this->postJson('/api/Song/CreateSong', $songData);

        $response->assertStatus(201);

    }
}
