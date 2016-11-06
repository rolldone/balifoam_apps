<?php namespace Rollproject\BalifoamApps\Models;

use Model;
use Nicolaslopezj\Searchable\SearchableTrait;
/**
 * Model
 */
class Karyawan extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use SearchableTrait;

    /**
     * Searchable rules.
     *
     * @var array
     */
    protected $searchable = [
        /**
         * Columns and their priority in search results.
         * Columns with higher values are more important.
         * Columns with equal values have equal importance.
         *
         * @var array
         */
        'columns' => [
            'nik' => 10,
            'nama_karyawan' => 10,
            'alias' => 10,
            'cabang' => 10,
            'status_kerja' => 10,
        ],
        
    ];

    /*
     * Validation
     */
    public $rules = [
    ];

    /*
     * Disable timestamps by default.
     * Remove this line if timestamps are defined in the database table.
     */
    public $timestamps = false;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'rollproject_balifoamapps_karyawan';
}