import React from "react";

export class Check_box1 extends React.Component{
	render(){
		var title = this.props.title_text || 'Set your title checkbox';
		var id = this.props.id;
		return(
			<div className="check_box">
				<div>
					<div class="checkbox custom">
					  <input id="box3" class="css-checkbox" type="checkbox" />
					  <label for="box3" class="css-label-blue"></label>
					  {/*Blue Checkbox-->*/}
					</div>
				</div>
				<div>
					<span className="title">{title}</span>
				</div>
			</div>
			);
	}
}