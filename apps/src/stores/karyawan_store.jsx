import { computed,autorun, observable } from 'mobx';

class Karyawan{
	@observable nik
	@observable id
	@observable nama_karyawan
	@observable alias
	@observable cabang
	@observable departemen
	@observable jabatan
	@observable jenis_kelamin
	@observable rfid
	@observable fp9
	@observable fp10
	@observable face
	@observable fp_neo
	@observable fp_revo
	@observable privilege
	@observable jadwal
	@observable tgl_keluar
	@observable status
	@observable status_kerja
	@observable masa_kontrak
	@observable tgl_selesai
	@observable masa_kerja_bln
	@observable masa_kerja_thn

	constructor(value){
		this.nik = value.nik;
		this.id = value.id;
		this.nama_karyawan = value.nama_karyawan;
		this.alias = value.alias;
		this.cabang = value.cabang;
		this.departemen = value.departemen;
		this.jabatan = value.jabatan;
		this.jenis_kelamin = value.jenis_kelamin;
		this.rfid = value.rfid;
		this.fp9 = value.fp9;
		this.fp10 = value.fp10;
		this.face = value.face;
		this.fp_neo = value.fp_neo;
		this.fp_revo = value.fp_revo;
		this.privilege = value.privilege;
		this.jadwal = value.jadwal;
		this.tgl_keluar = value.tgl_keluar;
		this.status = value.status;
		this.status_kerja = value.status_kerja;
		this.masa_kontrak = value.masa_kontrak;
		this.tgl_selesai = value.tgl_selesai;
		this.masa_kerja_bln = value.masa_kerja_bln;
		this.masa_kerja_thn = value.masa_kerja_thn;
	}
}

class KaryawanStore{
	@observable karyawans;
	@observable detailKaryawan;

	constructor() {
		this.karyawans = [];
		this.detalKaryawan = {};
	}

	saveKaryawan(value){
		this.karyawans.push(new Karyawan(value));
	}

	saveDetailKaryawan(value){
		this.detailKaryawan = new Karyawan(value);
	}
}

var store = window.store = new KaryawanStore;

export default store;

autorun(() => {
	console.log('Kosong');
});