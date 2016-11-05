<?php namespace Rollproject\BalifoamApps\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateRollprojectBalifoamappsKaryawan extends Migration
{
    public function up()
    {
        Schema::create('rollproject_balifoamapps_karyawan', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('reg', 10)->nullable();
            $table->string('type', 10)->nullable();
            $table->string('nik', 255);
            $table->string('nama_karyawan');
            $table->string('alias');
            $table->string('cabang');
            $table->string('departemen');
            $table->string('jabatan');
            $table->string('jenis_kelamin');
            $table->string('rfid')->default('0');
            $table->string('fp9');
            $table->string('fp10');
            $table->string('face');
            $table->string('fp_neo');
            $table->string('fp_revo');
            $table->string('privilege');
            $table->smallInteger('jadwal')->unsigned();
            $table->string('tgl_keluar');
            $table->string('status');
            $table->string('status_kerja');
            $table->integer('masa_kontrak')->default(0);
            $table->date('tgl_selesai')->nullable();
            $table->integer('masa_kerja')->unsigned();
            $table->decimal('masa_kerja_thn', 10, 0);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('rollproject_balifoamapps_karyawan');
    }
}
