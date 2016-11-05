<?php namespace Rollproject\BalifoamApps\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateRollprojectBalifoamappsKaryawan3 extends Migration
{
    public function up()
    {
        Schema::table('rollproject_balifoamapps_karyawan', function($table)
        {
            $table->integer('masa_kontrak')->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('rollproject_balifoamapps_karyawan', function($table)
        {
            $table->integer('masa_kontrak')->nullable(false)->change();
        });
    }
}
