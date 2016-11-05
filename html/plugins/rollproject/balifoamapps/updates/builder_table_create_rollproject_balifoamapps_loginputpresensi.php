<?php namespace Rollproject\BalifoamApps\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateRollprojectBalifoamappsLoginputpresensi extends Migration
{
    public function up()
    {
        Schema::create('rollproject_balifoamapps_loginputpresensi', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->date('tgl_upload');
            $table->integer('user')->unsigned();
            $table->timestamp('updated_at');
            $table->timestamp('created_at');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('rollproject_balifoamapps_loginputpresensi');
    }
}
