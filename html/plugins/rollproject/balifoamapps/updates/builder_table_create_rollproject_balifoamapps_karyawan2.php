<?php namespace Rollproject\BalifoamApps\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateRollprojectBalifoamappsKaryawan2 extends Migration
{
    public function up()
    {
        Schema::table('rollproject_balifoamapps_karyawan', function($table)
        {
            $table->unique('nik');
        });
    }
    
    public function down()
    {
        Schema::table('rollproject_balifoamapps_karyawan', function($table)
        {
            $table->dropUnique('nik');
        });
        
    }
}
