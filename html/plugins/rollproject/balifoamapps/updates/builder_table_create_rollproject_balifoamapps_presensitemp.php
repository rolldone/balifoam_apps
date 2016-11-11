<?php namespace Rollproject\BalifoamApps\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateRollprojectBalifoamappsPresensitemp extends Migration
{
    public function up()
    {
        Schema::create('rollproject_balifoamapps_presensitemp', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('pin')->unsigned();
            $table->date('tanggal');
            $table->time('jam');
            $table->string('sn_mesin', 50);
            $table->string('nama_mesin', 15);
            $table->string('verifikasi', 5);
            $table->string('mode', 15);
            $table->string('mode_update', 15);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('rollproject_balifoamapps_presensitemp');
    }
}
