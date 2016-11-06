import React from 'react';

export class Input_text1 extends React.Component{
	render(){
		var id = this.props.id || 'Set Your Id';
		var title_text = this.props.title_text || 'Set Your Title Text';
		var placeholder = this.props.place_holder || 'Set Your PlaceHolder';
		var value_text = this.props.value_text || '';
		var read_only = this.props.read_only == true ? 'readOnly' : '';
		var default_value = this.props.default_value || null;
		return(
			<div className="input_box">
				<span className="title">{title_text}</span>
				<input 
					className="input_form"
					id={id}
					value={value_text}
					type="text"  
					placeholder={placeholder}
					readOnly={read_only}/>
			</div>
		);
	}
}

export class Input_email1 extends React.Component{

	render(){
		var idnya = this.props.id || 'Set Your Id';
		var placeholder = this.props.place_holder || 'Set Your PlaceHolder';
		var title_text = this.props.title_text || 'Set Your Title Text';
		var read_only = this.props.read_only == true ? 'readOnly' : '';
		var default_value = this.props.default_value || '';
		return(
			<div className="input_box">
				<span className="title">{title_text}</span>
				<input
					id={idnya}
					defaultValue={default_value}
					className="input_form"
					type="email"
					placeholder={placeholder} 
					readOnly={read_only}
					 />
					}
			</div>
		);
	}
}

export class Input_number1 extends React.Component{
	render(){
		var id = this.props.id || 'Set Your Id';
		var placeholder = this.props.place_holder || 'Set Your PlaceHolder';
		var title_text = this.props.title_text || 'Set Your Title Text';
		return(
			<div className="input_box">
				<span className="title">{title_text}</span>
				<input
					className="input_form"
					id={id}
					defaultValue={default_value}
					type="email"
					placeholder={placeholder}
					readOnly={read_only}/>
			</div>
		);
	}
}

export class Input_password1 extends React.Component{
	render(){
		var id = this.props.id || 'Set Your Id';
		var placeholder = this.props.place_holder || 'Set Your Password';
		var title_text = this.props.title_text || 'Set Your Title Text';
		return(
			<div className="input_box">
				<span className="title">{title_text}</span>
				<input
					className="input_form"
					id={id}
					type="email"
					placeholder={placeholder}/>
			</div>
		);
	}
}

export class Input_file1 extends React.Component{
	componentDidMount(){
		load_input();
	}
	render(){
		var id = this.props.id || 'Set Your Id';
		var name = this.props.name || 'default_name';
		var placeholder = this.props.place_holder || 'Upload Your File';
		var title_text = this.props.title_text || 'Set Your Title Text';
		var is_multiple = this.props.is_multiple || false;
		return(
			<div className="input_box">
				<span className="title">{title_text}</span>
				<div
					className="input_form">
					<div class="box">
						{(function(){
							var filesnya = [];
							if(is_multiple == false){
								filesnya.push(
									<input key={id} type="file" name={name} id={id} class="inputfile inputfile-6"   />
									)
							}else{
								filesnya.push(
									<input key={id} type="file" name={name+"[]"} id={id} class="inputfile inputfile-6"
										data-multiple-caption="{count} files selected" multiple/>
									)
							}
							return filesnya;
						})()}
						<label for={id}><span></span> <strong><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> Choose a file&hellip;</strong></label>
					</div>
				</div>
			</div>
		);
	}
}

/*
 * load input file call from componentDIdMount() Input_upload1
 */
var load_input = function(){
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}