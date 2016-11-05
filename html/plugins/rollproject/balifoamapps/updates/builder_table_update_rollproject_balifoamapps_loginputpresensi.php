<?php namespace Rollproject\BalifoamApps\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateRollprojectBalifoamappsLoginputpresensi extends Migration
{
    public function up()
    {
        Schema::table('rollproject_balifoamapps_loginputpresensi', function($table)
        {
            $table->integer('user')->default(0)->change();
        });
    }
    
    public function down()
    {
        Schema::table('rollproject_balifoamapps_loginputpresensi', function($table)
        {
            $table->integer('user')->default(null)->change();
        });
    }
}
