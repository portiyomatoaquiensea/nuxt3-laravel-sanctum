<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MetaController extends Controller
{
    public function headMeta(Request $request)
    {
        $response = [
            "data" => [
                "head" => [
                    "title" => "Home",
                    "link" => [
                        ["rel" => "canonical", "href" => "https://www.negotiationeurope.com/"],
                        ["rel" => "amphtml", "href" => "https://boyagameplay.web.app/amp/"]
                    ],
                    "meta" => [
                        ["name" => "google-site-verification", "content" => "-aOieKKxJJU3WZrGJ8QeW_gRyYRWOZx5UQV1UmOIVMw"],
                        ["name" => "google-site-verification", "content" => "jCzNOPi0gIc2JDwJA7zZiQ7i0b4JT0eNlk-0vjnW6PA"],
                        ["name" => "google-site-verification", "content" => "erDcRmh_2vPgF09eU3ktl1K4Fx3PQS2ps-Lumi6Ieho"],
                        ["name" => "google-site-verification", "content" => "EG4iKrWQoaqNDfA5vkMaF0Q-H9uaQedrMO7yx3EGmqs"],
                        ["name" => "google-site-verification", "content" => "Uxw0FWzRrxRUoBpB7XeuEaEN1r1DL96AgHVCN73UzOs"],
                        ["name" => "google-site-verification", "content" => "Egp2kH592tjUm2mbkCYSpwA5NVTZddvqnqf27N7Fyt4"],
                    ],
                    "scripts" => [
                        [
                            "type" => "text/javascript",
                            "charset" => "utf-8",
                            "children" => "!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=[\"page\",\"track\",\"identify\",\"instances\",\"debug\",\"on\",\"off\",\"once\",\"ready\",\"alias\",\"group\",\"enableCookie\",\"disableCookie\",\"holdConsent\",\"revokeConsent\",\"grantConsent\"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r=\"https://analytics.tiktok.com/i18n/pixel/events.js\",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement(\"script\");n.type=\"text/javascript\",n.async=!0,n.src=r+\"?sdkid=\"+e+\"&lib=\"+t;var s=document.getElementsByTagName(\"script\")[0];s.parentNode.insertBefore(n,s)};ttq.load('D28TTKRC77UF6R3NQTUG');ttq.page();}(window,document,'ttq');"
                        ],
                        [
                            "type" => "text/javascript",
                            "charset" => "utf-8",
                            "children" => "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','968133332075497');fbq('track','PageView');"
                        ]
                    ]
                ],
                "body" => [
                    "jquerySrc" => "https://code.jquery.com/jquery-3.6.0.min.js",
                    "floatingPanelHtml" => '
    <div class="fixed-left">
        <div class="fixed-qr">
            <a href="https://t.ly/slotboyawhatsapp" target="_blank" class="animated">
                <img src="https://ampslotboyacom.pages.dev/images/wa-boya.gif" class="fixed-img-100" />
            </a>
        </div>
        <div class="fixed-vpn">
            <a href="https://t.me/slotboya" target="_blank" class="animated">
                <img src="https://ampslotboyacom.pages.dev/images/tele-boya.gif" class="fixed-img-100" />
            </a>
        </div>
        <div class="fixed-r">
            <a href="https://linkcepat.my/sboyartp" target="_blank" rel="nofollow" class="animated">
                <img src="https://ampslotboyacom.pages.dev/images/rtp-boya.gif" class="fixed-img-100" />
            </a>
        </div>
        <div class="fixed-vpn">
            <a href="https://www.facebook.com/groups/2203525293351326" target="_blank" class="animated">
                <img src="https://ampslotboyacom.pages.dev/images/fb-boya.gif" class="fixed-img-100" />
            </a>
        </div>
        <section class="fixed-arrow dflex vertical-align-center justify-content-center">
            <img src="https://lazadachoco.pages.dev/images/select.png" alt="Arrow RTP" class="img-xxs" />
        </section>
    </div>'
                    ,
                    "floatingButtonHtml" => '
    <a href="https://direct.lc.chat/12719100/" target="_blank" rel="nofollow">
        <img src="https://res.cloudinary.com/dmkpgzeun/image/upload/v1739452078/two_jzlqck.png" class="floatingButton" width="100" height="100" />
    </a>'
                ]
            ]
        ];

        return response()->json($response);
    }
}
