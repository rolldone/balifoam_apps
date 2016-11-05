import React from "react";
import {
	Input_text1,
	Input_email1,
	Input_password1
} from '../forms/input_box.jsx';

import {
	Dropdown_box1,
	Dropdown_box2
}
from '../forms/dropdown_box.jsx';

import {
	Toggle_box1,
	Toggle_box2
}
from '../forms/toggle_box.jsx';

import {
	Check_box1
}
from '../forms/check_box.jsx';

import { 
	Tab, 
	Tabs, 
	TabList, 
	TabPanel 
} from 'react-tabs';

import {
	Tab_box,
	Tab_list_box,
	Tab_menu_item,
	Tab_panel_box,
	Tab_content_item
} from '../forms/tab_box.jsx';

export class Front_user extends React.Component{

	render(){
		return(
			<div className="table_wrapper full_width shadow_border">
				<div className="table_menu_bar">
					<div>
						<button className="btn_action wet_aspalt">
							<div>
								<div className="icn_menu s20">
									<div className="add"></div>
								</div>
							</div>
							<div>
								<span>Add</span>
							</div>
						</button>
						<button className="btn_action wet_aspalt">
							<div>
								<div className="icn_menu s20">
									<div className="trash"></div>
								</div>
							</div>
							<div>
								<span>Delete</span>
							</div>
						</button>
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
					    <th>ID</th>
					    <th>Name</th>
					    <th>Address</th>
					    <th>Email</th>
					    <th>Status</th>
					  </tr>
						  {(function(){
						  	var tt = [];
						  	for(var a=0;a<10;a++){
						  		tt.push(
					  				<tr key={a} className="data_table">
								    	<td>#9938</td>
								    	<td>Donny Rolanda</td>
								    	<td>Jln Kepaon Indah Blok A/40</td>
								    	<td>donny.rolanda@gmail.com</td>
								    	<td>Active</td>
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
						for(var a=0;a<5;a++){
							tt.push(
								<li key={a}>
									<a>
										<span>{a+1}</span>
									</a>
								</li>
								)
						}
						return tt;
					})()}
					<li>
						<a>
							<span>...</span>
						</a>
					</li>
				</ul>
			</div>
		);
	}
}

export class Front_user_form extends React.Component{

	handleSelect(index, last) {
	    console.log('Selected tab: ' + index + ', Last tab: ' + last);
	  }

	constructor(){
		super();
	}

	render(){
		return (
			<div className="form_wrapper full_width shadow_border">
				<ul className="title_form">
					<li>
						<a className="link_title">
							<span>Front Users</span>
						</a>
					</li>
					<li>
						<a className="title_name_form">
							<span>New Front User</span>
						</a>
					</li>
				</ul>
				<Tab_box tabId="formTab">
					<Tab_list_box>
						<Tab_menu_item><h3>1</h3></Tab_menu_item>
						<Tab_menu_item><h3>2</h3></Tab_menu_item>
						<Tab_menu_item><h3>3</h3></Tab_menu_item>
					</Tab_list_box>

					<Tab_panel_box>
						<Tab_content_item>
							<h1>vadfvadfvfdv</h1>
						</Tab_content_item>
						<Tab_content_item>
							<h1>aaaaaaaaaaa</h1>
						</Tab_content_item>
					</Tab_panel_box>
				</Tab_box>
				<div className="form_content">
							<div className="form_pos_form">
								<div className="full left">
									<Input_text1 
										place_holder="James Bons"
										title_text="Input Your Name"
										 />
								</div>
								<div>
									<Input_email1 
										title_text="Your Email Address"
										place_holder="jamesbond@007.com"
										/>
								</div>
								<div>
									<Input_text1 
										place_holder="rolldone"
										title_text="Input Your Username"
										 />
								</div>
								<div className="full_right">
									<Input_password1 
										place_holder="Your New Password"
										title_text="Input Your Password"
										 />
								</div>
								<div className="full_right">
									<Input_password1 
										place_holder="Re-Type New Password"
										title_text="Re-Type Your Password"
										 />
								</div>
								<div>
									<Dropdown_box1 
										place_holder="Re-Type New Password"
										title_text="Blockir User"
										 />
								</div>
								<div>
									<Dropdown_box2
										place_holder="Re-Type New Password"
										title_text="Blockir User"
										 />
								</div>
								<div>
									<Toggle_box1
										place_holder="Re-Type New Password"
										title_text="Blockir User"
										 />
								</div>
								<div>
									<Toggle_box2
										place_holder="Re-Type New Password"
										title_text="Blockir User"
										 />
								</div>
								<div>
									<Check_box1
										title_text="lorem ipsum dolor sit amet"
										/>
								</div>
							</div>
						</div>
				<div className="bottom_form">
					<ul className="form_action">
						<li>
							<button className="btn_action wet_aspalt">
								<div>
									<span>Save</span>
								</div>
							</button>
						</li>
						<li>
							<button className="btn_action wet_aspalt">
								<div>
									<span>Save & Close</span>
								</div>
							</button>
						</li>
						<li>
							<span className="text_action"> Or </span>
						</li>
						<li>
							<a href="#">
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

