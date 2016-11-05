import React from "react";
import {
	Link
} from 'react-router';

var jquery = require('jquery');

export default class Side_menu extends React.Component{

	constructor(props){
		super(props);
		this.handleRemoteClick = this.handleRemoteClick.bind(this);
	}

	handleRemoteClick(){
		sideMenuBar();
	}

	render(){
		this.data = this.props.parse_side_data;
		
		//
		// harus pake var javascript kalo mau
		// implementasikan for entah kenapa begitu
		//

		var tt = this.data;
		var vm = this;
		return(
			<ul className="side_menu_list">
				{(function(){
					var tar = [];
					console.log(tt);
					for(var a=0;a < tt.length ; a++){
						tar.push(
							<li key={a} className="is_title">
								<div data-model="vmvdfmvkv" className="title_menu_list">
									<span>{tt[a].title}</span>
								</div>
							</li>
						);
						for(var b = 0 ; b < tt[a].menu_data.length ; b++){
							tar.push(
								<li key={a+'-'+b} >
									<Link className="side_menu_item" onClick={vm.handleRemoteClick} activeClassName={"activeState"} to={'/main/'+tt[a].menu_data[b].link}>
										<div>
											<div className="icn_menu">
												<div className={tt[a].menu_data[b].icn}></div>
											</div>
										</div>
										<span>
											{tt[a].menu_data[b].menu_name}
										</span>
										<div>
											<div className="icn_menu">
												<div className="right_arrow"></div>
											</div>
										</div>
									</Link>
								</li>
							);
						}
					}
					return tar;
				})()}
			</ul>
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