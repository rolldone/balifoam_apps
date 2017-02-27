<?php namespace Rollproject\Balifoamapps\Components;

use Cms\Classes\ComponentBase;
use Excel;
use Rollproject\BalifoamApps\Models\Karyawan;
use Db;


class KaryawanComponent extends ComponentBase
{

    public function componentDetails()
    {
        return [
            'name'        => 'KaryawanComponent Component',
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
                case "fetch-data-karyawan":
                    $this->fetchDataKaryawan($params[2],$params[3],$params[4]);
                    break;
                case "upload-presensi":
                    $this->uploadPresensi();
                    break;
                case "fetch-all":
                    $this->fetchAll();
                    break;
                case "fetch-detail-karyawan":
                    $this->fetchDetailKaryawan();
                    break;
                case "count-total":
                    $this->getTotal();
                    break;
                case "search-karyawan":
                    $this->searchKaryawan($params[2],$params[3]);
                    break;
                case "export-karyawan":
                    $this->exportKaryawan();
            }
        }
    }

    public function exportKaryawan(){
        $pre = Db::table('rollproject_balifoamapps_karyawan')//->where('hh.tanggal',$tanggal)
            ->select(DB::raw('id,nik,nik,nama_karyawan AS "Nama Karyawan",alias,cabang,departemen,jabatan,
                jenis_kelamin as "Jenis Kelamin",rfid,fp9 as "FP 9",fp10 as "FP 10",face,fp_neo as "FP Neo",
                fp_revo as "FP Revo",privilege,jadwal,tgl_keluar as "Tgl Keluar",status,status_kerja as "Status Kerja",
                masa_kontrak as "Masa Kontrak",tgl_selesai as "Tgl Selesai", masa_kerja_bln as "Masa Kerja (Bln)",
                masa_kerja_thn as "Masa Kerja (Thn)"'))->get();
        $data = array();
        foreach ($pre as $result) {
            $data[] = (array)$result;  
        }
        Excel::create('presensi',function($excel) use($data){
            $excel->sheet('Sheet 1',function($sheet) use($data){
                $sheet->fromArray($data);
                $sheet->setAutoFilter();
            });
        })->export('xls');
    }

    public function searchKaryawan($take,$skip){
        $query = $_POST['whattext'];
        $users = Karyawan::search($query)->take($take)->skip($take*($skip-1))->get();
        $jsondata = [
            'success_place' => 'searchKaryawan()',
            'status' => 'success',
            'variable' => ['query'=>$query],
            'message' => $users
        ];
        echo json_encode($jsondata,true);
    }

    public function fetchDetailKaryawan(){
        $kar = Karyawan::find($_POST['id']);
        $jsondata = [
            'success_place' => 'fetchDetailKaryawan()',
            'status' => 'success',
            'variable' => "$kar",
            'message' => $kar
        ];
        echo json_encode($jsondata,true);
    }

    public function getTotal(){
        if(isset($_GET['is_search'])){
            $querynya = $_GET['query'];
            $kar = Karyawan::search($querynya)->get();
            $kar = count($kar);
            echo $kar;
            return;
        }
        $kar = new Karyawan();
        $kar = $kar->count();
        echo $kar;
    }

    private function fetchDataKaryawan($tanggal = null,$dataperpage = 20,$page = 1){
        $kar = new Karyawan();
        $kar = $kar->take($dataperpage)->skip($dataperpage * $page)->get();
        $jsondata = [
            'success_place' => 'fetchDataKaryawan()',
            'status' => 'success',
            'variable' => "unknown",
            'message' => $kar
        ];
        echo json_encode($jsondata,true);
        return;
    }

    private function uploadPresensi(){
        try{
            $uploadFile = $_FILES["file_excel"]['name'];
            Excel::load(realpath($_FILES['file_excel']['tmp_name']),function($reader){
                $excelnya = $reader->get();
                Karyawan::truncate();
                /**/
                try{
                    for($a=0 ; $a < count($excelnya) ; $a++){
                        $ex = $excelnya[$a];
                        if($ex['pin'] == null){
                            // jika ternyata null biasanya space excel 
                            // dibawah title
                        }else{
                            $kk = new Karyawan();
                            $kk = $kk->where('id','=',$ex['pin'])->get();
                            if(isset($kk[0])){
                                $kk = $kk[0];
                            }else{
                                $kk = new Karyawan();
                            }
                            // nama pin di simpan ke field id table
                            $kk->id = $ex['pin'];
                            $kk->nik = $ex['nik'];
                            $kk->nama_karyawan = $ex['nama_karyawan'];
                            $kk->alias = $ex['alias'];
                            $kk->cabang = $ex['cabang'];
                            $kk->departemen = $ex['departemen'];
                            $kk->jabatan = $ex['jabatan'];
                            $kk->jenis_kelamin = $ex['jenis_kelamin'];
                            $kk->rfid = $ex['rfid'];
                            $kk->fp9 = $ex['fp_9'];
                            $kk->fp10 = $ex['fp_10'];
                            $kk->face = $ex['face'];
                            $kk->fp_neo = $ex['fp_neo'];
                            $kk->fp_revo = $ex['fp_revo'];
                            $kk->privilege = $ex['privilege'];
                            $kk->jadwal = $ex['jadwal'];
                            $kk->tgl_keluar = $ex['tgl_keluar'];
                            $kk->status = $ex['status'];
                            $kk->status_kerja = $ex['status_kerja'];
                            $kk->masa_kontrak = $ex['masa_kontrak'];
                            $kk->tgl_selesai = $ex['tgl_selesai'];
                            if($ex['masa_kerja_bln'] == null){
                                $kk->masa_kerja_bln = 0;
                            }else{
                                $kk->masa_kerja_bln = $ex['masa_kerja_bln'];
                            }
                            if($ex['masa_kerja_thn'] == null){
                                $kk->masa_kerja_thn = 0;
                            }else{
                                $kk->masa_kerja_thn = $ex['masa_kerja_thn'];
                            }
                            
                            $kk->save();
                        }
                        
                    }
                    $jsondata = [
                        'success_place' => 'uploadPresensi()',
                        'status' => 'success',
                        'variable' => "unknown",
                        'message' => 'Success Input Data Karyawan'
                    ];
                    echo json_encode($jsondata,true);
                }catch(\Exception $ex){
                    $jsondata = [
                        'error_place' => 'uploadPresensi()',
                        'status' => 'error',
                        'message' => $ex->getMessage(),
                        'stack_trace' => $ex->getTrace()
                    ];
                    echo json_encode($jsondata,true);
                }
            });
            //$inputtext1 = $_POST['inputtext1'];
        }catch(\Exception $ex){
            $jsondata = [
                'error_place' => 'uploadPresensi()',
                'status' => 'error',
                'message' => $ex->getMessage(),
                'stack_trace' => $ex->getTrace()
            ];
            echo json_encode($jsondata,true);
        }
    }
}