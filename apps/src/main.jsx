import React, { PropTypes } from "react";
import ReactDOM from 'react-dom';
import {Router,Route, IndexRoute, useRouterHistory, hashHistory, browserHistory} from "react-router";
import { createHashHistory } from 'history';

//
// import define router format helper
//

import { define_history } from './helpers/define_route.jsx'; 
//
// import mobx store
//

import karyawan_store from './stores/karyawan_store.jsx';
import presensi_store from './stores/presensi_store.jsx';

//
// import component
//

import Side_menu_component from './components/side_menu.jsx'; 
import {Front_user,Front_user_form} from './components/front_user.jsx'; 
import {Category_list, Category_form} from './components/Category_module.jsx';
import {karyawan_list,karyawan_form,karyawan_info} from './components/karyawan_module.jsx';
import {presensi_list,presensi_form} from './components/presensi_module.jsx';

//
// import const data service
// tanda {} lansung targetin ke variablenya
//

// 
// bisa juga begini
// var {dataSideMenu} = require('./react/services/dataSideMenu.jsx');
// tapi not recommended lah mungkin pake manggil jquery atau librari
// yang lain
//

import {dataSideMenu} from './services/dataSideMenu.jsx';

//
// load jquery
//
var jquery = require('jquery');

//
// ini adalah kelas bagian dari dashboard layout
// 

class Main_layout extends React.Component {

	constructor(){
		super();
		this.state = {
			"is_click" : false
		}
		this.hideSideMenu = this.hideSideMenu.bind(this);
	}

	hideSideMenu(){
		sideMenuBar();
	}

	render(){
		
		return(
				<div className="dashboard_wrapper">
					<div id="side_wrap">
						<a className="title_app">
							<span>BALI FOAM</span>
						</a>
						<div>
							<Side_menu_component  parse_side_data={dataSideMenu}/>
						</div>
					</div>
					<div id="contentnya">
						<div className="content_menu_bar shadow_border_bottom">
							<div>
								<ul className="menu_bar_list" onClick={this.hideSideMenu}>
									<li>
										<a className="menu_bar_btn">
											<div className="toggle"></div>
										</a>
									</li>
								</ul>
							</div>
							<div>
								
							</div>
						</div>
						<div className="content_wrapper">
							
							{/* 
							 //
							 //child content route
							 //
							*/}
							
							{this.props.children}
							
						</div>
					</div>
				</div>
		);
	}
}

var sideMenuBar = function(){
	if(jquery('#side_wrap').css("display") == "none"){
		jquery('#side_wrap').css("display",'inline-block');
		jquery('#contentnya').css('left',"225px");
	}else{
		jquery('#side_wrap').removeAttr('style');
		jquery('#contentnya').removeAttr('style');
	}
}

//
// ini adalah kelas bagian dari login layout
//

class Login extends React.Component{

	/*constructor(){
		super();
	}*/

	render(){
		return(
			<div class="login_wrapper">
				<h1>this is login</h1>
			</div>
		);
	}
}


const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
const app = document.getElementById('app');

class RouteRedirect extends React.Component{
		static contextTypes = {
		    router: PropTypes.object
	  	};

		constructor(props,context) {
			super(props,context);
			//console.log(this.props);
			this.context.router.replace(this.props.route.redirect);
		}

		render(){
			return(
				<div>Redirecting.....</div>
				);
		}

	}

const reactRouter = ((

	//
	// <Router history={appHistory} kampret
	// history={appHistory} ini dia pelakunya jadi blank
	// mending di kosongin aja atau pasang hasHistory
	// contoh <Router>
	// sumbernya ada di https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md
	//

	<Router history={define_history}>
		<Route path="/" component={RouteRedirect} redirect="/main/karyawan/list" />
		<Route path="/main" component={Main_layout}>
		
			//
			// direct lansung ke child punya 
			// route segment seperti misal front-user
			//

			<Route path="front-user">
				<Route path="list" component={Front_user}/>
				<Route path="form" component={Front_user_form}/>
			</Route>
			<Route path="category">
				<Route path="list" component={Category_list}/>
				<Route path="form" component={Category_form}/>
			</Route>
			<Route path="karyawan">
				<Route path="list" store={karyawan_store} component={karyawan_list} />
				<Route path="form" component={karyawan_form}/>
				<Route path="info" store={karyawan_store} component={karyawan_info} />
			</Route>
			<Route path="presensi">
				<Route path="list" store={presensi_store} component={presensi_list} />
				<Route path="form" component={presensi_form}/>
			</Route>
			<Route path="/login" component={Login}></Route>
		</Route>
		
	</Router>
	))

	


ReactDOM.render(reactRouter,app);

