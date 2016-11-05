import React from "react";
import ReactDOM from 'react-dom';
var $ = require('jquery');

class Layout extends React.Component {
	constructor(){
		super();
		this.name = "donny rolanda";
	}
	getMyStatus(){
		return "oh yeah i will";
	}
	render () {
		//
		//udah di test ternyata beda dengan yang di contructor
		//
		const name = "what gonna u do?";
		
		return (
		  <div>
		  	<h1>{this.name}</h1>
		    <p> {name+" "}{3+2}{this.getMyStatus()}</p>
		    <p> this is the first time </p>
		    <p> Yuhuu ReactJS is Running!</p>
		    <p> this is the first time </p>
		  </div>
		);
	}
}


const app = document.getElementById('app');
ReactDOM.render(<Layout/>,app);