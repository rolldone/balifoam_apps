<?php namespace Rollproject\BalifoamApps\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateRollprojectBalifoamappsKaryawan extends Migration
{
    public function up()
    {
        Schema::table('rollproject_balifoamapps_karyawan', function($table)
        {
            $table->renameColumn('masa_kerja', 'masa_kerja_bln');
        });
    }
    
    public function down()
    {
        Schema::table('rollproject_balifoamapps_karyawan', function($table)
        {
            $table->renameColumn('masa_kerja_bln', 'masa_kerja');
        });
    }
}
