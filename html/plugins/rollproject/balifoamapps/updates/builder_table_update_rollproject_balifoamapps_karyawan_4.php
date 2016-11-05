<?php namespace Rollproject\BalifoamApps\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateRollprojectBalifoamappsKaryawan4 extends Migration
{
    public function up()
    {
        Schema::table('rollproject_balifoamapps_karyawan', function($table)
        {
            $table->date('tgl_selesai')->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('rollproject_balifoamapps_karyawan', function($table)
        {
            $table->date('tgl_selesai')->nullable(false)->change();
        });
    }
}
