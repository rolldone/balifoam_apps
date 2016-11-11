import { computed,autorun, observable } from 'mobx';
import { Karyawan } from './karyawan_store.jsx';
class Presensi{
	@observable id
	@observable pin
	@observable tanggal
	@observable jam
	@observable sn_mesin
	@observable nama_mesin
	@observable verifikasi
	@observable mode
	@observable mode_update
	@observable created_at
	@observable updated_at

	constructor(value){
		this.id = value.id;
		this.pin = value.pin;
		this.tanggal = value.tanggal;
		this.jam = value.jam;
		this.sn_mesin = value.sn_mesin;
		this.nama_mesin = value.nama_mesin;
		this.verifikasi = value.verifikasi;
		this.mode = value.mode;
		this.created_at = value.created_at;
		this.updated_at = value.updated_at;
		this.karyawannya = new Karyawan(value);

	}
}

class PresensiStore{
	@observable presensis;

	constructor() {
		this.presensis = [];
	}

	savePresensi(value){
		this.presensis.push(new Presensi(value));
	}
}

var presensiStore = window.store = new PresensiStore;

export default presensiStore;
