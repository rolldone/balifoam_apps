<?php namespace Rollproject\BalifoamApps\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateRollprojectBalifoamappsKaryawan2 extends Migration
{
    public function up()
    {
        Schema::table('rollproject_balifoamapps_karyawan', function($table)
        {
            $table->string('fp9', 255)->nullable()->change();
            $table->string('fp10', 255)->nullable()->change();
            $table->string('face', 255)->nullable()->change();
            $table->string('fp_neo', 255)->nullable()->change();
            $table->string('fp_revo', 255)->nullable()->change();
            $table->string('privilege', 255)->nullable()->change();
            $table->string('tgl_keluar', 255)->nullable()->change();
            $table->string('status', 255)->nullable()->change();
            $table->string('status_kerja', 255)->nullable()->change();
            $table->date('tgl_selesai')->nullable(false)->change();
        });
    }
    
    public function down()
    {
        Schema::table('rollproject_balifoamapps_karyawan', function($table)
        {
            $table->string('fp9', 255)->nullable(false)->change();
            $table->string('fp10', 255)->nullable(false)->change();
            $table->string('face', 255)->nullable(false)->change();
            $table->string('fp_neo', 255)->nullable(false)->change();
            $table->string('fp_revo', 255)->nullable(false)->change();
            $table->string('privilege', 255)->nullable(false)->change();
            $table->string('tgl_keluar', 255)->nullable(false)->change();
            $table->string('status', 255)->nullable(false)->change();
            $table->string('status_kerja', 255)->nullable(false)->change();
            $table->date('tgl_selesai')->nullable()->change();
        });
    }
}
