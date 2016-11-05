import React,{ PropTypes } from "react";
import { observer } from 'mobx-react';
import ReactDOM from 'react-dom';
import Pikaday from 'react-pikaday';
import {
	Link
} from 'react-router';
import { route_history } from '../helpers/define_route.jsx';
/*
 * call jquery library
 */
var jquery = require('jquery');

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
	uploadFilePresensiService,
	fetchDataPresensi,
	totalFetchPresensi,
	cekExistDataPresensi
} from '../services/httpServices.jsx';


/*
 * load external helper
 */
var dateFormat = require('../helpers/date_format.js');

@observer
export class presensi_list extends React.Component{

	static contextTypes = {
	    router: PropTypes.object
	  };

	constructor(props,context){
		super(props,context);
		this.context = context;
		var newDate = new Date();
		console.log('propsnya',this.props);
		try{
			if(this.props.location.state.date != undefined){
				newDate = new Date(this.props.location.state.date);
			}
		}catch(ex){
			console.log(ex);
		}
		
		this.state = {
			listPresensi : [],
			paginateState : definePagination,
			date : newDate
		}
		this.totalPagination = this.totalPagination.bind(this);
		this.changePagination = this.changePagination.bind(this);
		this.loadCalendar = this.loadCalendar.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.exportPresensi = this.exportPresensi.bind(this);
	}

	exportPresensi(){
		var vm = this;
		var win = window.open("http://localhost/balifoam_apps/html/restapi/v1/presensi/export-presensi?tanggal="+dateFormat.formatDate(vm.state.date), '_blank');
  		win.focus();
	}

	loadCalendar(){
		$('.date-picker').trigger('click');
	}

	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps',nextProps);
	   /* this.setState({
	        children: nextProps.children
	    });*/
	}

	shouldComponentUpdate(nextProps, nextState){
		//console.log('shouldComponentUpdate',nextProps);
		//console.log('shouldComponentUpdate',nextState);
		return true;
	}

	componentWillUpdate(nextProps, nextState){
		console.log('componentWillUpdate',nextProps);
		/*this.setState({
			date : prevProps.location.state.date
		});*/
		//console.log('componentWillUpdate',nextState);
	}

	componentDidUpdate(prevProps, prevState){
		console.log('componentDidUpdate',prevProps);
		//console.log('componentDidUpdate',prevState);
		//if(prevProps.locations.state.date ==)
		
	}

	componentDidMount() {
		var vm = this;
		storeDataPresensi(dateFormat.formatDate(this.state.date),vm.state.paginateState.totalPerPage,vm.state.paginateState.setNumber,function(data){
			console.log('hasilnya',data);
			data = data.message;
			vm.props.route.store.presensis = [];
			for(var a = 0; a < data.length; a++){
				vm.props.route.store.savePresensi(data[a]);
			}
			vm.setState({listPresensi : vm.props.route.store.presensis});
		});
		this.totalPagination(this.state.date);
	}

	totalPagination(datenya){
		var vm = this;
		getTotalPresensi(dateFormat.formatDate(datenya),function(data){
			console.log('totalnya',data);
			definePagination.pageTotal = data;
			var mod = definePagination.pageTotal % definePagination.totalPerPage;

			definePagination.diff = (definePagination.pageTotal / definePagination.totalPerPage);
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

	handleChange(date){
		// kembalikan lagi jadi setNumber 1
		definePagination.setNumber = 1;

		this.setState({
	      date: date,
	      paginateState: definePagination
	    });

	    var vm = this;
	    storeDataPresensi(dateFormat.formatDate(this.state.date),vm.state.paginateState.totalPerPage,1,function(data){
			console.log('hasilnya',data);
			data = data.message;
			vm.props.route.store.presensis = [];
			for(var a = 0; a < data.length; a++){
				vm.props.route.store.savePresensi(data[a]);
			}
			vm.setState({listPresensi : vm.props.route.store.presensis});
		});
		this.totalPagination(this.state.date);
	}

	changePagination(page){
		definePagination.setNumber = page;
		var vm = this;
		console.log('testff',dateFormat.formatDate(this.state.date));
		storeDataPresensi(dateFormat.formatDate(this.state.date),vm.state.paginateState.totalPerPage,page,function(data){
			data = data.message;
			vm.props.route.store.presensis = [];
			for(var a = 0; a < data.length; a++){
				vm.props.route.store.savePresensi(data[a]);
			}
			vm.setState({listPresensi : vm.props.route.store.presensis});
		});
		this.totalPagination(this.state.date);
	}

	render(){
		var vm = this;
		var date = this.state.date;
		vm.presensi_list = this.state.listPresensi;
		return(
			<div className="table_wrapper full_width shadow_border">
				<div className="table_menu_bar">
					<div>
						<Link to={"/main/presensi/form"} >
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
						<div className="option_wrapper">
							<div>
								<div className="datepicker_wrap">
									<div>
										<Pikaday value={date} className="date-picker" onChange={this.handleChange} />
									</div>
									<div>
										<div onClick={this.loadCalendar} class="icn_menu btn_click_calendar">
											<div className="calendar"></div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<button onClick={this.exportPresensi} className="btn_action no_margin_right wet_aspalt">
									<div>
										<div className="icn_menu s15">
											<div className="excel"></div>
										</div>
									</div>
									<div>
										<span>Export</span>
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
				<table className="table_content">
					<tbody>
					  <tr>
					    <th>NIK</th>
					    <th>Nama</th>
					    <th>Jam Masuk</th>
					    <th>Tanggal</th>
					    <th>Departemen</th>
					    <th>Jabatan</th>
					  </tr>
						  {(function(){
						  	var tt = [];
						  	for(var a=0; a < vm.presensi_list.length; a++){
						  		var ll = vm.presensi_list[a];
						  		tt.push(
					  				<tr key={a} className={a % 2 == 0 ? "data_table":"data_table cloud"}>
								    	<td>{ll.karyawannya.nik}</td>
								    	<td>{ll.karyawannya.nama_karyawan}</td>
								    	<td>{ll.jam}</td>
								    	<td>{dateFormat.indoFormatDate(ll.tanggal)}</td>
								    	<td>{ll.karyawannya.departemen}</td>
								    	<td>{ll.karyawannya.jabatan}</td>
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
							//console.log('b',b);
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

/*
 * presensi form component
 */

export class presensi_form extends React.Component{

	static contextTypes = {
	    router: PropTypes.object
	  };

	constructor(context){
		super(context);
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
		this.context = context;
	}

	backToList(){
		//this.props.history.push('main/presensi/list');
		//route_history().push('/main/presensi/list');
		route_history().goBack();
		//this.context.router.push('/main/presensi/list');
		//hashHistory.push('/main/presensi/list');
	}

	uploadFile(){
		console.log('clicked');
		this.waitingProcess();
		var vm = this;
		doUploadFile(function(response_result,message_resp){
			//return;
			vm.responseProcess(vm,response_result,message_resp.response_text);
			if(response_result){
				setTimeout(function() {
					// deprecated
					// vm.props.history.push('main/presensi/list');
					definePagination.setNumber = 1;
					vm.context.router.push({
						pathname : '/main/presensi/list',
  						query: { modal: true },
						state : {
							paginateState : definePagination,
							date : message_resp.tanggal
						}
					});
				}, 2000);
			}
		});
		/*cekExistDataPresensi(function(response){
			if(response.status == "success"){
				response = response.message;
				if(response){
					console.log('all ready exist');
					vm.responseProcess(vm,false,response);
				}else{
					console.log('nothing data');

					doUploadFile(function(response_result,message_resp){
						//console.log('taraaa',message_resp);
						//return;
						vm.responseProcess(vm,response_result,message_resp);
						if(response_result){
							setTimeout(function() {
								vm.props.history.push('main/presensi/list');
							}, 3);
						}
					});
				}
			}else{
				console.log(response);
			}
			
		});*/
		
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
						<a className="link_title" onClick={vm.backToList} >
							<span>List Presensi</span>
						</a>
					</li>
					<li>
						<a className="title_name_form">
							<span>New Presensi</span>
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

var getTotalPresensi = function(datenya,total){
	totalFetchPresensi(datenya,function(data){
		total(data);
	});
}

var doUploadFile = function(resres){
	jquery('#btn_save').prop('disabled', true);
	var formData = new FormData();
	formData.append('file_excel',jquery('#inputFileExcel')[0]['files'][0]);
	uploadFilePresensiService(formData,function(data){
		console.log(data.status);
		//return;
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

var storeDataPresensi = function(datenya,take,skip,callback){
	fetchDataPresensi(datenya,take,skip,function(data){
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



