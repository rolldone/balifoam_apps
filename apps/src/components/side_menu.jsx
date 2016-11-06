import React,  { PropTypes } from "react";
import {
	Link,
	IndexLink
} from 'react-router';

var jquery = require('jquery');

export default class Side_menu extends React.Component{
	static contextTypes = {
	    router: PropTypes.object
	  };
	constructor(props){
		super(props);
		this.state = {
			data_menu : this.props.parse_side_data
		}
		this.handleRemoteClick = this.handleRemoteClick.bind(this);
		this.handlerRouteActive = this.handlerRouteActive.bind(this);
	}

	handleRemoteClick(){
		sideMenuBar();
	}

	handlerRouteActive(whatRoute){
		this.handleRemoteClick();
		var queryPath = "";
		var isActive = false;
		// batas path
		var batas = 3; 
		var kel = 0;
		try{
			whatRoute.split("/").slice(0).forEach(function(elem){
	        	// queryPath[elem] = queryPath[elem] || {}; 
		        //queryPath += queryPath[elem];
		        if(kel != batas){
					queryPath += elem+"/";
		        }else{
		        	throw BreakException
		        }
		        kel++;
		    });
		}catch(Ex){
			//console.log('ttt',);
		}
		console.log('ttt',this.context.router.isActive(queryPath)+" - "+queryPath);
		return this.context.router.isActive(queryPath);
	}

	render(){
		this.data = this.props.parse_side_data;
		
		//
		// harus pake var javascript kalo mau
		// implementasikan for entah kenapa begitu
		//

		var tt = this.state.data_menu;
		
		//this.context.router.isActive(to, onlyActiveOnIndex);
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
									<Link to={"/main"+tt[a].menu_data[b].link} className={vm.handlerRouteActive('/main'+tt[a].menu_data[b].link) == true ? "side_menu_item activeState" : "side_menu_item"} >
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


class NavItem extends React.Component {
  render () {
    const { router } = this.context
    const { index, onlyActiveOnIndex, to, children, ...props } = this.props

    const isActive = router.isActive(to, onlyActiveOnIndex)
    const LinkComponent = index ? Link : IndexLink

    return (
      <li className={isActive ? 'active' : ''}>
        <LinkComponent {...props}>{children}</LinkComponent>
      </li>
    )
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