import {staticVariable} from './helperServices.jsx';

/*
 * http service code list
 */

/*
 * call jquery library
 */

 var jquery = require('jquery');

export const totalFetchKaryawan = function(callback){
	console.log('call fetch data karyawan');
	jquery.ajax({
		type:"GET",
	    /*
	     * contentType and processData must set false for upload file
	     */
		processData:false,
		contentType:false,
		url:staticVariable.url_restapi+"/karyawan/count-total",
		success:function(data){
			callback(data);
		},
		error:function(data){
			callback(data);
		},
		dataType: 'json'
	})
} 

export const uploadFileService = function(postdata,callback){
	console.log('upload file service call!');
	jquery.ajax({
		type:"POST",
		data:postdata,
	    /*
	     * contentType and processData must set false for upload file
	     */
	    processData: false,
	    contentType: false,
		url:staticVariable.url_restapi+"/karyawan/upload-presensi",
		success:function(data){
			callback(data);
		},
		error:function(data){
			callback(data);
		},
  		dataType: 'json'
	});
}

export const fetchDataKaryawan = function(postdata,take,skip,callback){
	console.log('call fetch data karyawan');
	jquery.ajax({
		type:"GET",
		data:postdata,
	    /*
	     * contentType and processData must set false for upload file
	     */
		processData:false,
		contentType:false,
		url:staticVariable.url_restapi+"/karyawan/fetch-data-karyawan/0/"+take+"/"+skip,
		success:function(data){
			callback(data);
		},
		error:function(data){
			callback(data);
		},
		dataType: 'json'
	})
}

export const totalFetchPresensi = function(datenya,callback){
	console.log('call total data presensi!',datenya);
	var formData = new FormData();
	formData.append('datenya',datenya);
	jquery.ajax({
		type:"POST",
		data:formData,
	    /*
	     * contentType and processData must set false for upload file
	     */
		processData:false,
		contentType:false,
		url:staticVariable.url_restapi+"/presensi/count-total",
		success:function(data){
			callback(data);
		},
		error:function(data){
			callback(data);
		},
		dataType: 'json'
	})
}

export const uploadFilePresensiService = function(postdata,callback){
	console.log('upload file presensi service call!');
	jquery.ajax({
		type:"POST",
		data:postdata,
	    /*
	     * contentType and processData must set false for upload file
	     */
	    processData: false,
	    contentType: false,
		url:staticVariable.url_restapi+"/presensi/upload-presensi",
		success:function(data){
			callback(data);
		},
		error:function(data){
			callback(data);
		},
  		dataType: 'json'
	});
}

export const fetchDataPresensi = function(datenya,take,skip,callback){
	console.log('call fetch data Presensi!');
	var formData = new FormData();
	console.log('tgl_akhir',datenya);
	formData.append('datenya',datenya);
	jquery.ajax({
		type:"POST",
		data:formData,
	    /*
	     * contentType and processData must set false for upload file
	     */
		processData:false,
		contentType:false,
		url:staticVariable.url_restapi+"/presensi/fetch-data-presensi/"+take+"/"+skip,
		success:function(data){
			callback(data);
		},
		error:function(data){
			callback(data);
		},
		dataType: 'json'
	})
}

export const cekExistDataPresensi = function(callback){
	console.log('call cek exist data presensi!');
	jquery.ajax({
		type:"GET",
		url:staticVariable.url_restapi+"/presensi/cek-exist-presensi",
		success:function(data){
			callback(data);
		},
		error:function(data){
			callback(data);
		},
		dataType: 'json'
	})
}