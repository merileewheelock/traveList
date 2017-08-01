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
		$.ajax({
			method: "POST",
			url: hostAddress + '/listview',
			data: {
				surveyId: this.props.surveyId,
				token: this.props.loginInfo.token
			}
		})
	}

	render(){

		var listArray = [];
		var lastCategory = "";
		// var key = 0;

		this.state.listData.map((listItem, index)=>{
			if(listItem.itemCategory !== lastCategory){
				listArray.push(
					<div className="col-sm-offset-6" key={listItem.id}>
						<h3 className="category-title">{listItem.itemCategory}</h3>
					</div>
				)
				lastCategory = listItem.itemCategory;
				// key++;
			}
			listArray.push(
				<div key={listItem.id}>
                	<div className="col-sm-6 text-right">
						<input type="checkbox" />
						<span className="slider round"></span>
					</div>
                	<div className="col-sm-6 item">{listItem.item}</div>
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
		loginInfo: state.registerReducer,
		surveyId: state.surveyReducer
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		listAction: ListAction
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ListView);