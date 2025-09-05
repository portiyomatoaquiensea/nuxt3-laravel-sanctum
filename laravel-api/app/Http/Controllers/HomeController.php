<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\OpenUrl;
use Illuminate\Support\Facades\Config;

class HomeController extends Controller
{
    public function slider(Request $request)
    {
        $response = [
            "data" => [
                [
                    "id" => 1,
                    "img" => "https://latte.cdnsimple.top/m/slider/640x299_id.jpg",
                    "title" => "Promo 1",
                ],
                [
                    "id" => 2,
                    "img" => "https://latte.cdnsimple.top/m/slider/mobile.png",
                    "title" => "Promo 2",
                ],
                [
                    "id" => 3,
                    "img" => "https://latte.cdnsimple.top/m/slider/1741972972-640x299.png",
                    "title" => "Promo 3",
                ]
            ]
        ];
        return response()->json($response);
    }
}
