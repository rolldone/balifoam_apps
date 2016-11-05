import React from "react";

export class ResponseMessage_box1 extends React.Component{
	render(){
		var id = this.props.id || 'Set Your Id';
		var is_show = this.props.is_show || false;
		var is_success = '';
		switch(this.props.is_success.toLowerCase()){
			case 'error':
				is_success = 'error';
				break;
			case 'success':
				is_success = 'success';
				break;
			case 'waiting':
				is_success = 'waiting';
				break;
		}
		//var is_success =  this.props.is_success || 'Error';
		var title_text = this.props.title_text || 'Set Your Title Text';
		var message_text = this.props.message_text || 'Set Your Message Response Text';
		//console.log('apakah',this.props.is_success.toLowerCase());
		return(
			<div id={id} className={is_show == true ? 'message_box  show' : 'message_box '}>
				<span className={'title '+is_success}>{title_text}</span>
				<span className="message_text">{message_text}</span>
			</div>
		);
	}
}