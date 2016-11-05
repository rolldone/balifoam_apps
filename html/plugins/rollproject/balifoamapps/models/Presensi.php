<?php namespace Rollproject\BalifoamApps\Models;

use Model;

/**
 * Model
 */
class Presensi extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /*
     * Validation
     */
    public $rules = [
    ];

    public $belongsTo = [
        'karyawannya' => [
            'Rollproject\Balifoamapps\Models\Karyawan',
            'key' => 'pin', //idnya product  yang relasi
        ],
    ];

    /*
     * Disable timestamps by default.
     * Remove this line if timestamps are defined in the database table.
     */
    public $timestamps = true;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'rollproject_balifoamapps_presensi';
}