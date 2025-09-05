<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class SeoController extends Controller
{
    public function robotText(Request $request)
    {
        $content = <<<EOT
User-agent: *
Allow: /

Sitemap: {$request->getSchemeAndHttpHost()}/sitemap.xml
EOT;

        return Response::make($content, 200, [
            'Content-Type' => 'text/plain',
        ]);
    }

    public function sitemap(Request $request)
    {
        $host = $request->getSchemeAndHttpHost();

        $content = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>{$host}/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>{$host}/home</loc>
    <priority>0.8</priority>
  </url>
</urlset>
XML;

        return Response::make($content, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
