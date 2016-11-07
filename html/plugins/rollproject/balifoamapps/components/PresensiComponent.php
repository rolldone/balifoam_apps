<?php namespace Rollproject\Balifoamapps\Components;

use Cms\Classes\ComponentBase;
use Rollproject\BalifoamApps\Models\Presensi;
use Excel;
use Db;

class PresensiComponent extends ComponentBase
{

    public function componentDetails()
    {
        return [
            'name'        => 'PresensiComponent Component',
            'description' => 'No description provided yet...'
        ];
    }

    public function defineProperties()
    {
        return [];
    }

    public function storeSlug($slugnya = null){
         if ($slugnya != null) {
            //this is wrong because allready segmentizeUrl before
            //$params = RouterHelper::segmentizeUrl($slugnya);
            //this is right because no need converstion begin
            $params = $slugnya;
            switch ($params[1]) {
                case "fetch-data-presensi":
                    $this->fetchDataPresensi($params[2],$params[3]);
                    break;
                case "upload-presensi":
                    $this->uploadPresensi();
                    break;
                case "fetch-all":
                    $this->fetchAll();
                    break;
                case "count-total":
                    $this->getTotal();
                    break;
                case "cek-exist-presensi":
                    $this->cekUploadPresensi();
                    break;
                case "export-presensi":
                    $this->exportPresensi();
                    break;
            }
        }
    }

    public function getTotal(){
        if(isset($_POST['datenya'])){
            $kar = new Presensi();
            $kar = $kar->whereDate('tanggal','=',$_POST['datenya'])->get();
            echo count($kar);
            return;
        }
        $kar = new Presensi();
        $kar = $kar->count();
        echo $kar;
    }

    public function fetchDataPresensi($take,$skip){
        $kar = new Presensi();
        $datenya = date('Y-m-d');
        //if(isset($_POST['datenya'])){
            //$datenya = 
       // }
        $kar = $kar->take($take)->whereDate('tanggal','=',$_POST['datenya'])->skip($take * $skip)->with('karyawannya')
            ->orderBy('jam','desc')->get();
        $jsondata = [
            'success_place' => 'fetchDataPresensi()',
            'status' => 'success',
            'variable' => "unknown",
            'message' => $kar
        ];
        echo json_encode($jsondata,true);
        return;
    }

    /*
     * cek terlebih dahulu
     * apakah sudah upload dengan date yang sama
     * jika ternyata sama maka akan muncul dialog
     * data di perbaharui atau tidak
     */
    private function cekUploadPresensi(){
        try{
            $response = false;
            $pre = new Presensi();
            $pre = $pre->whereDate('tanggal','=',date("Y-m-d"))->get();
            if(isset($pre[0])){
                $response = true;
            }
            $jsondata = [
                'success_place' => 'cekUploadPresensi()',
                'status' => 'success',
                'variable' => "$response",
                'message' => $response
            ];
            echo json_encode($jsondata,true);
        }catch(\Exception $ex){
            $jsondata = [
                'error_place' => 'cekUploadPresensi()',
                'status' => 'error',
                'message' => $ex->getMessage(),
                'stack_trace' => $ex->getTrace()
            ];
            echo json_encode($jsondata,true);
        }
    }
    // --

    /*
     * lakukan export presensi 
     */
    public function exportPresensi(){
        $tanggal = $_GET['tanggal'];
        $pre = Db::table('rollproject_balifoamapps_karyawan as gg')//->where('hh.tanggal',$tanggal)
            ->leftJoin('rollproject_balifoamapps_presensi as hh',
                'hh.pin','=','gg.id')->whereNull('hh.pin')->orWhere('hh.tanggal',$tanggal)
            ->select(DB::raw('gg.nik,gg.id,gg.nama_karyawan AS "Nama Karyawan",gg.cabang,gg.departemen,hh.jam,hh.tanggal'))
            ->get();
        $data = array();
        foreach ($pre as $result) {
            $data[] = (array)$result;  
        }
        Excel::create('presensi',function($excel) use($data){
            $excel->sheet('Sheet 1',function($sheet) use($data){
                $head[] = [
                    "nik" =>'NIK',
                    "id" => 'PIN',
                    "nama_karyawan"=>'Nama Karyawan',
                    "cabang" => 'Cabang',
                    "departemen" => 'Departemen',
                    "jam" => 'Jam Masuk',
                    "tanggal" => 'Tanggal'
                ];
                
                foreach ($data as $key => $value) {
                    # code...
                    

                }
                //array_merge($head, $data[0]);
                $sheet->fromArray($data);
                //$sheet->fromArray($data[0]);
                $sheet->setAutoFilter();
            });
        })->export('xls');
        /*$jsondata = [
            'success_place' => 'exportPresensi()',
            'status' => 'success',
            'variable' => "$pre",
            'message' => $pre
        ];*/
        //echo json_encode($jsondata,true);
        //echo json_encode($pre,true);
    }

    public $uploadFile = null;
    private function uploadPresensi(){
        try{
            $uploadFile = $_FILES['file_excel'];
            $mimes = array('application/vnd.ms-excel',
                'text/plain',
                'text/xls',
                'text/xlsx',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'text/csv',
                'text/tsv');
            if(in_array($uploadFile['type'],$mimes)){
              // do something
            } else {
                $jsondata = [
                    'error_place' => 'uploadPresensi()',
                    'status' => 'error',
                    'message' => "Sorry, mime type not allowed => ",
                    'stack_trace'=>$uploadFile['type']
                ];
                echo json_encode($jsondata,true);
                return;
            }
            Excel::load(realpath($_FILES['file_excel']['tmp_name']),function($reader){
                $excelnya = $reader->get();
                /*$jsondata = [
                        'success_place' => 'uploadPresensi()',
                        'status' => 'success',
                        'variable' => "unknown",
                        'message' => $excelnya[0]
                    ];
                echo json_encode($jsondata,true);
                return
                /**/
                $excelSelection = $excelnya[0];
                try{
                    $ex = null;
                    for($a=1 ; $a < count($excelSelection) ; $a++){
                        $kk = new Presensi();
                        $ex = $excelSelection[$a];

                        // 
                        // pengecekan terlebih dahulu
                        // apakah ada yang sudah di input
                        $kk = $kk->whereDate('tanggal','=',date('Y-m-d', strtotime(str_replace("/","-",$ex['tanggal']))))
                            ->where('pin','=',$ex['pin'])->get();
                        if(isset($kk[0]) == false){
                            $kk = new Presensi();
                        }else{
                            $kk = $kk[0];
                        }
                        
                        $kk->pin = $ex['pin'];
                        $newDate = date('Y-m-d', strtotime(str_replace("/","-",$ex['tanggal'])));
                        $kk->tanggal = $newDate;
                        $kk->jam = $ex['jam'];
                        $kk->sn_mesin = $ex['sn_mesin'];
                        $kk->nama_mesin = $ex['nama_mesin'];
                        $kk->verifikasi = $ex['verifikasi'];
                        $kk->mode = $ex['mode'];
                        $kk->mode_update = $ex['mode_update'];
                        $kk->save();
                    }
                    $jsondata = [
                        'success_place' => 'uploadPresensi()',
                        'status' => 'success',
                        'variable' => "unknown",
                        'message' => [
                            'tanggal'=>date('Y-m-d', strtotime(str_replace("/","-",$ex['tanggal']))),
                            'response_text'=>'Success Input Data Karyawan'
                        ]
                    ];
                    echo json_encode($jsondata,true);
                }catch(\Exception $eex){
                    $jsondata = [
                        'error_place' => 'uploadPresensi()',
                        'status' => 'error',
                        'message' => [$eex->getMessage()],
                        'stack_trace' => $eex->getTrace()
                    ];
                    echo json_encode($jsondata,true);
                }
            });
        }catch(\Exception $ex){
            $jsondata = [
                'error_place' => 'uploadPresensi()',
                'status' => 'error',
                'message' => ['response_text' => $ex->getMessage()],
                'stack_trace' => $ex->getTrace()
            ];
            echo json_encode($jsondata,true);
        }
    }

}