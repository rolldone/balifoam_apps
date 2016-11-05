<?php namespace Rollproject\BalifoamApps;

use System\Classes\PluginBase;
use Rollproject\Balifoamapps\Components\KaryawanComponent as KaryawanComponent;
use Rollproject\Balifoamapps\Components\PresensiComponent as PresensiComponent;
use October\Rain\Router\Helper as RouterHelper;
use Illuminate\Support\Facades\Event;
use App;
use \Illuminate\Foundation\AliasLoader;
use Route;
class Plugin extends PluginBase
{
    public function registerComponents()
    {
    }

    public function registerSettings()
    {
    }

    public function boot(){
    	if (isset($_SERVER['HTTP_ORIGIN'])) {
            if ($_SERVER['HTTP_ORIGIN'] == "http://localhost" || $_SERVER['HTTP_ORIGIN'] == "http://localhost:3000") {
                header("Access-Control-Allow-Credentials: true");
                header("Access-Control-Allow-Origin:" . $_SERVER['HTTP_ORIGIN']);
                header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
                header("Access-Control-Allow-Headers: referer, range, accept-encoding,Origin, X-Requested-With, Content-Type, origin, authorization, accept, client-security-token");
            }
        }
       
        Route::group(['prefix' => "restapi/v1"/*awalnya Config::get('cms.prikologSawRestUri', 'psikologsawrestapi')*/], function () {
            Route::match(['get','post'], '{slug}', function ($test) {
            	$params = RouterHelper::segmentizeUrl($test);
            	switch ($params[0]) {
                    case "karyawan":
                        $karyawan = new KaryawanComponent();
                        $karyawan->storeSlug($params);
                        break;
                    case "presensi":
                        $presensi = new PresensiComponent();
                        $presensi->storeSlug($params);
                        break;
                }
        	 })->where('slug', '(.*)?');//Katalog\Admin\Controllers\UserMember@katalogrestapi
        });
    }
}
