import React from "react";

export class Dropdown_box1 extends React.Component{
	render(){
		var title = this.props.title_text || "Set your title";
		var placeholder = this.props.place_holder || "Set your placeholder";
		var id = this.props.id || "Set your id";
		return(
			<div className="dropdown_box">
				<span className="title">{title}</span>
				<div>
					<div className="dropdown_item">
						<div>
							<div className="value_dropdown">
								<span className="value">Enable</span>
								<div>
									<div className="icn_menu s20">
										<div className="arrow_bottom"></div>
									</div>
								</div>
							</div>
						</div>
						<div>
							<ul className="list_dropdown">
								<li>
									<span>Enable</span>
								</li>
								<li>
									<span>Disable</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

//
// dengan fungsi search data di dalam 
// dropdown nya
//

export class Dropdown_box2 extends React.Component{
	render(){
		var title = this.props.title_text || "Set your title";
		var placeholder = this.props.place_holder || "Set your placeholder";
		var id = this.props.id || "Set your id";
		return(
			<div className="dropdown_box">
				<span className="title">{title}</span>
				<div>
					<div className="dropdown_item">
						<div>
							<div className="value_dropdown">
								<span className="value">Enable</span>
								<div>
									<div className="icn_menu s20">
										<div className="arrow_bottom"></div>
									</div>
								</div>
							</div>
						</div>
						<div>
							<input className="dropdown_search" type="text" placeholder="Search Data" />
						</div>
						<div>
							<ul className="list_dropdown">
								<li>
									<span>Enable</span>
								</li>
								<li>
									<span>Disable</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
