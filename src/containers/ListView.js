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
		this.state.listData.map((listItem, index)=>{
			listArray.push(
				<div key={index}>
					{this.state.listData[index].item}
				</div>
			)
		})

		return(
			<div className="">
				<h1>List View</h1>
				{listArray}
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		listView: state.ListReducer
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		listAction: ListAction
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ListView);