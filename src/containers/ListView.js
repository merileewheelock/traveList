import React, {Component} from 'react';
import  {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ListAction from '../actions/ListAction';
import $ from 'jquery';
import hostAddress from '../config'

class ListView extends Component{
	constructor(props) {
		super(props);
		this.state = {
			listData: []
		}
		this.getListItems = this.getListItems.bind(this);
	}

	componentWillMount() {
		if(this.props.loginInfo.token !== undefined){
			this.props.listAction(this.props.loginInfo.token)
		}
	}

	componentDidMount() {
		this.getListItems(this.props);
	}

	getListItems(props){
		const url = hostAddress + '/listview'
		$.getJSON(url,(data)=>{
			this.setState({
				listData: data
			})
			console.log(this.state.listData)
		})
	}

	render(){

		var listArray = [];
		var lastCategory = "";
		var key = 0;

		this.state.listData.map((listItem, index)=>{
			if(this.state.listData[index].itemCategory !== lastCategory){
				listArray.push(
					<div className="col-sm-offset-6" key={index}>
						<h3 className="category-title">{this.state.listData[index].itemCategory}</h3>
					</div>
				)
				lastCategory = this.state.listData[index].itemCategory;
				key++;
			}
			listArray.push(
				<div key={index}>
                	<div className="col-sm-6 text-right">
						<input type="checkbox" />
						<span className="slider round"></span>
					</div>
                	<div className="col-sm-6 item">{this.state.listData[index].item}</div>
                </div> 
			)
		})

		return(
			<div>
				<h1>Your Packing List</h1>
				{listArray}
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		listView: state.ListReducer,
		loginInfo: state.registerReducer
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		listAction: ListAction
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ListView);