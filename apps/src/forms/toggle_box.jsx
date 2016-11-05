import React from "react";

export class Toggle_box1 extends React.Component{
	render(){
		var title = this.props.title_text || "Set your title";
		var placeholder = this.props.place_holder || "Set your placeholder";
		var id = this.props.id || "Set your id";
		return(
			<div className="toggle_box">
				<span className="title">{title}</span>
				<div>
					<label className="switch">
					  <input type="checkbox" defaultChecked />
					  <div className="slider round"></div>
					</label>
				</div>
			</div>
		)
	}
}

export class Toggle_box2 extends React.Component{
	render(){
		var title = this.props.title_text || "Set your title";
		var placeholder = this.props.place_holder || "Set your placeholder";
		var id = this.props.id || "Set your id";
		return(
			<div className="toggle_box">
				<span className="title">{title}</span>
				<div>
					<label className="switch">
					  <input type="checkbox" defaultChecked />
					  <div className="slider"></div>
					</label>
				</div>
			</div>
		)
	}
}

