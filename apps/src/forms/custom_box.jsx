import React from 'react';

export class Button_box1 extends React.Component{
	constructor(props) {
		super(props);
		
	}
	render(){
		var id = this.props.id || 'Set Your Id';
		var title_text = this.props.title_text || 'Set Your Title Text';
		var name_text = this.props.name_text || '';
		var disabled_btn = this.props.disabled_btn == true ? 'disabled' : '';
		return(
			<div className="input_box">
				<span className="title">{title_text}</span>
				<div className="wrap_inline">
					<button 
						onClick={this.props.evenClick.bind(this)}
						className="btn_action wet_aspalt no_width"
						id={id}
						type="button"  
						disabled={disabled_btn}>{name_text}</button>
				</div>
				

			</div>
		);
	}
}