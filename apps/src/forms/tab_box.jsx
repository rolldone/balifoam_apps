import React from "react";

export class Tab_box extends React.Component{

	//
	// setup context harus static yaa 
	// childContextTypes nya
	//
	static childContextTypes = {
		tabActive : React.PropTypes.string
	}

	getChildContext(){
		return { tabActive : "none" };
	}

	//
	// setup constructor class
	//

	constructor(props){
		super(props);
		this.state = {"parentnya":'okokokokoko'};
		this.change = this.change.bind(this);
		this.test = this.test.bind(this);
	}


	// 
	// define binding function
	//

	change = (e) =>{
		this.setState({"parentnya":'loalalvadfmvkfdvm'});
		//tab_relation.rootId = 'aaaa';
		//console.log('idnya',tab_relation.rootId);
		//return "hehehehe";
	}

	test = (e) =>{
		this.setProps({"parse_text":"kovakvakvodfkv"});
	}


	//
	// render now
	//
	
	render(){
		var vm = this;
		var tt = this.state;
		var change = this.change;
		var newChildren = React.Children.map(this.props.children, function(child) {
		  return React.cloneElement(child, {tabId:vm.props.tabId})
		});
		return(
			<div>
				{newChildren}
			</div>
		);
	}
}

export class Tab_list_box extends React.Component{

	

	//
	// set default props
	//

	defaultProps(){
		return{
			foo:'default foo'
		}
	}

	//
	// render now!
	//

	render(){
		var vm = this;
		var lengthchildren = this.props.children;
		console.log('avadmvkdfmvkfdv',this.props.tabId);
		var indexnya = 0;
		var newChildren = React.Children.map(this.props.children, function(child) {
		  return React.cloneElement(child, {
		  	tabId:vm.props.tabId+'-'+indexnya++,
		  	
		  })
		});
		return(
			<div>
				{newChildren}
				{(function(){
					console.log(lengthchildren);
					for(var a = 0;a < lengthchildren.length ;a++){

					}
				})()}
			</div>
		);
	}
}

export class Tab_menu_item extends React.Component{
	
	static contextTypes = {
		tabActive : React.PropTypes.string
	}

	constructor(){
		super();
		this.state =  {
			tabUsed : "jjjjj"
		}
		//this.tab_loader = this.tab_loader.bind(this);
		this.content = this.content.bind(this);
		this.simpanTabId = this.simpanTabId.bind(this);
	}


	simpanTabId(tabId){
		//console.log('dapetnya : ',tabId);
		this.context.tabActive = tabId;//this.props.tabId;
		//console.log('ok jadinya ',this.context.tabActive);
	}

	tab_loader(whatTabs){
		console.log('tab_loader sebelum  : '+ whatTabs);
		this.simpanTabId(this.props.tabId);
		console.log('tab_loader clicked : '+ this.context.tabActive);
	}

	content(){
		console.log('tabId_',this.props.tabId);
		var vm = this;
		var isCustom = false;
		var gg = "";
		var tab_loadClick = function(whatTabs){
			if(vm.context.tabActive != whatTabs){
				console.log('hei its different '+whatTabs+" - "+vm.context.tabActive);
			}
			vm.context.tabActive = whatTabs;
			console.log(vm.context.tabActive);
		}
		if(isCustom == true){
			gg = 
				<div>
					{vm.props.children}
				</div>;    
		}else{
			gg = 
				<div onClick={tab_loadClick.bind(vm,vm.props.tabId)}>
					{vm.props.children}
				</div>  
		}
		return gg;
	}

	render(){
		return this.content();
	}
}

export class Tab_panel_box extends React.Component{
	render(){
		return(
			<div>
				{this.props.children}
			</div>
		);
	}
}

export class Tab_content_item extends React.Component{

	render(){
		var isHidden = "display : none";
		if(this.props.hidden){
			isHidden = "display : block";
		}
		return(
			<div>
				{this.props.children}
			</div>
		);	
	}
}

(function(){
	
})();



