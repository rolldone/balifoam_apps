import React, { PropTypes } from "react";
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { route_history } from '../helpers/define_route.jsx';
/*
 * call jquery library
 */
 var jquery = require('jquery');
//---

import {
	Input_text1,
	Input_email1,
	Input_password1,
	Input_file1,
} from '../forms/input_box.jsx';

import {
	ResponseMessage_box1
} from '../forms/message_box.jsx';

import {
	uploadFileService,
	fetchDataKaryawan,
	totalFetchKaryawan
} from '../services/httpServices.jsx';

var dateFormat = require('../helpers/date_format.js');

@observer
export class karyawan_list extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			listKaryawan : [],
			paginateState : definePagination
		}
		this.totalPagination = this.totalPagination.bind(this);
		this.changePagination = this.changePagination.bind(this);
	}

	componentDidMount() {
		var vm = this;
		storeDataKaryawan(vm.state.paginateState.totalPerPage,vm.state.paginateState.setNumber,function(data){
			data = data.message;
			vm.props.route.store.karyawans = [];
			for(var a = 0; a < data.length; a++){
				vm.props.route.store.saveKaryawan(data[a]);
			}
			vm.setState({listKaryawan : vm.props.route.store.karyawans});
		});
		this.totalPagination();
	}

	totalPagination(){
		var vm = this;
		getTotalKaryawan(function(data){
			console.log('totalnya',data);
			definePagination.pageTotal = data;
			var mod = definePagination.pageTotal % definePagination.totalPerPage;
			definePagination.diff = (definePagination.pageTotal / definePagination.totalPerPage);
			//console.log('aaa',definePagination.diff);
			if(definePagination.diff % 1 == 0){
				definePagination.diff = definePagination.diff-1;
			}else{
				definePagination.diff = Math.floor(definePagination.diff);
			}
			
			vm.setState({
				paginateState : definePagination
			});
		});
	}

	changePagination(page){
		definePagination.setNumber = page;
		var vm = this;
		storeDataKaryawan(vm.state.paginateState.totalPerPage,page,function(data){
			data = data.message;
			vm.props.route.store.karyawans = [];
			for(var a = 0; a < data.length; a++){
				vm.props.route.store.saveKaryawan(data[a]);
			}
			vm.setState({listKaryawan : vm.props.route.store.karyawans});
		});
		this.totalPagination();
	}

	render(){
		var vm = this;
		vm.karyawans = this.state.listKaryawan;
		return(
			<div className="table_wrapper full_width shadow_border">
				<div className="table_menu_bar">
					<div>
						<Link to="/main/karyawan/form">
							<button className="btn_action wet_aspalt">
								<div>
									<div className="icn_menu s15">
										<div className="add"></div>
									</div>
								</div>
								<div>
									<span>Upload From Excel</span>
								</div>
							</button>
						</Link>
					</div>
					<div>
						<div className="search_table">
							<input type="text" className="search_component" />
							<div >
								<div className="icn_menu">
									<div className="search"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<table className="table_content">
					<tbody>
					  <tr>
					    <th>NIK</th>
					    <th>Nama</th>
					    <th>Alias</th>
					    <th>Cabang</th>
					    <th>Departemen</th>
					    <th>Jabatan</th>
					  </tr>
						  {(function(){
						  	var tt = [];
						  	for(var a=0; a < vm.karyawans.length; a++){
						  		var ll = vm.karyawans[a];
						  		tt.push(
					  				<tr key={a} className={a % 2 == 0 ? "data_table":"data_table cloud"}>
								    	<td>{ll.nik}</td>
								    	<td>{ll.nama_karyawan}</td>
								    	<td>{ll.alias}</td>
								    	<td>{ll.cabang}</td>
								    	<td>{ll.departemen}</td>
								    	<td>{ll.jabatan}</td>
								  	</tr>

						  			)

						  	}
						  	return tt;
						  })()}
					</tbody>
				</table>
				<ul className="pag_table">
					{(function(){
						var tt = [];
						var a = 0;
						var b = 0;
						if(vm.state.paginateState.setNumber + vm.state.paginateState.distance > vm.state.paginateState.diff){
							b = vm.state.paginateState.diff;
						}else{
							b = vm.state.paginateState.setNumber + vm.state.paginateState.distance;
						}
						if(vm.state.paginateState.setNumber - vm.state.paginateState.distance <= 0){
							a = 0;
						}else{ 
							a = vm.state.paginateState.setNumber - vm.state.paginateState.distance;
						}
						for(; a < b; a++){
						tt.push(
							<li key={a} onClick={vm.changePagination.bind(vm,a+1)}>
								<a>
									<span className={vm.state.paginateState.setNumber == a+1?'aktifkan':''}>{a+1}</span>
								</a>
							</li>
							)
						}
						return tt;
					})()}
					
				</ul>
			</div>
		);
	}
}

export class karyawan_form extends React.Component{
	static contextTypes = {
	    router: PropTypes.object
	  };
	constructor(){
		super();
		this.state = {
			status_response : '',
			show_response : false,
			title_response_text : '',
			message_response_text : ''
		};
		this.uploadFile = this.uploadFile.bind(this);
		this.waitingProcess = this.waitingProcess.bind(this);
		this.responseProcess = this.responseProcess.bind(this);
		this.backToList = this.backToList.bind(this);
	}

	uploadFile(){
		console.log('clicked');
		this.waitingProcess();
		var vm = this;
		doUploadFile(function(response_result,message_resp){
			vm.responseProcess(vm,response_result,message_resp);
			if(response_result){
				setTimeout(function() {
					vm.props.history.push('main/karyawan/list');
				}, 3);
			}
		});
	}

	backToList(){
		// deprecated
		//this.props.history.push('main/karyawan/list');
		this.context.router.push('/main/karyawan/list')

		//route_history().goBack();//('main/karyawan/list');
	}

	waitingProcess(){
		this.setState({ show_response : true});
		this.setState({ title_response_text : "Menunggu" });
		this.setState({ status_response : 'waiting' });
		this.setState({ message_response_text : 'Data Sedang Di Process'});
	}

	responseProcess(vm,response_result,message_resp){
		vm.setState({ message_response_text : message_resp });
		vm.setState({ show_response : true });
		if(response_result){
			vm.setState({ status_response : 'success' });
			vm.setState({ title_response_text : "Success" });
		}else{
			vm.setState({ status_response : 'error' });
			vm.setState({title_response_text : "Error"});
		}
	}

	render(){
		var vm = this;
		return (
			<div className="form_wrapper full_width shadow_border">
				<ul className="title_form">
					<li>
						<a className="link_title">
							<span>List Karyawan</span>
						</a>
					</li>
					<li>
						<a className="title_name_form">
							<span>New Front User</span>
						</a>
					</li>
				</ul>
				<div className="form_content">
							<div className="form_pos_form">
								<div className="full left">
									<Input_file1 
										id="inputFileExcel"
										place_holder="James Bons"
										title_text="Upload File Excel"
										is_multiple={false}
										 />
								</div>
								<div className="full left">
									<ResponseMessage_box1 
										id="message_response"
										is_success={this.state.status_response}
										is_show={this.state.show_response}
										title_text={"Message Response "+this.state.title_response_text}
										message_text={this.state.message_response_text}
									/>
								</div>
							</div>
						</div>
				<div className="bottom_form">
					<ul className="form_action">
						<li>
							<button id="btn_save" className="btn_action wet_aspalt" onClick={vm.uploadFile}>
								<div>
									<span>Save & Close</span>
								</div>
							</button>
						</li>
						<li>
							<span className="text_action"> Or </span>
						</li>
						<li>
							<a href="javascript: void(0)" onClick={vm.backToList}>
								<span className="text_action link">Cancel</span>
							</a>
						</li>
						<li></li>
					</ul>
				</div>
			</div>
		);
	}
}

/*
 * bussiness process 
 */

var definePagination = {
	pageTotal : 0,
	totalPerPage : 10,
	diff:0,
	distance:5,
	setNumber:1
}

var getTotalKaryawan = function(total){
	totalFetchKaryawan(function(data){
		total(data);
	});
}

var doUploadFile = function(resres){
	jquery('#btn_save').prop('disabled', true);
	var formData = new FormData();
	formData.append('file_excel',jquery('#inputFileExcel')[0]['files'][0]);
	uploadFileService(formData,function(data){
		if(data.status == "success"){
			resres(true, data.message);
			console.log('success',data);
		}else{
			console.log(data);
			jquery('#btn_save').prop('disabled', false);
			resres(false, data.message);
		}
	});
}

var storeDataKaryawan = function(take,skip,callback){
	fetchDataKaryawan({},take,skip,function(data){
		switch(data.status){
			case "success":
				callback(data);
			break;
			case "error":
				callback(data);
			break;
		}
	});
}