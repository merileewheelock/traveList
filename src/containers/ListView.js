import React, {Component} from 'react';
import  {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ListAction from '../actions/ListAction';
import WeatherDiv from './WeatherDiv';
import UserPackingListAction from '../actions/UserPackingListAction';
import $ from 'jquery';

class ListView extends Component{
	constructor(props) {
		super(props);
		this.state = {
			listArray: [],
			token: '',
			surveyId: '',
			item: '',
			itemCategory: '',
			tripId: '',
			query: '',
			showDelete: false
		}

		this.deleteToggle = this.deleteToggle.bind(this);
		this.renderDeleteButton = this.renderDeleteButton.bind(this);
	}


	componentWillMount() {
		if(this.props.loginInfo.token !== undefined){
			this.props.listAction({
				token: this.props.loginInfo.token,
				surveyId: this.props.surveyId
			})
		}
	}


	componentDidMount() {
		this.setState({
			token:this.props.loginInfo.token,
			surveyId: this.props.surveyId
		})
	}


	componentWillReceiveProps(nextProps) {
		// console.log("NEXT PROPS")
		// console.log(nextProps)

		var listData = []
		var newItemIndex = 1;
		var currentCategory = "init";

		nextProps.listView.map((listItem, index)=>{

			if(listItem.itemCategory !== currentCategory){
				console.log("Running listItem.itemCategory !== currentCategory")

				// if (currentCategory !== "init") {
				// 	listData.push(
				// 		<div className='row add-item-row'>
				// 			<div className='col-xs-6 col-xs-offset-3'>
				// 				<input className={currentCategory} placeholder="Add Item" />
				// 			</div>
				// 			<div className='col-xs-3'>
				// 				<img className='add-item-button' src="../images/plus.png" onClick={ () => {this.addNewItem(newItemIndex, currentCategory)}} />
				// 			</div>
				// 		</div>
				// 	)
				// }


				listData.push(
					<div className="row" key={listItem.id}>
						<div className="col-xs-offset-1 col-xs-11">
							<h3 className="category-title">{listItem.itemCategory}</h3>
						</div>
					</div>
				)

				listData.push(
					<div className="row" key={listItem.id}>
	                	<div className="col-xs-3 text-right">
							<input type="checkbox" className="list-checkbox" />
							<label htmlFor="list-checkbox"></label>
						</div>
	                	<div className= 'col-xs-8 item'>{listItem.item}</div>
	                	{/*<div className='col-xs-1'>
	                		<img className='not-visible delete-button' onClick={ ()=> {this.deleteItem(listItem.item, listItem.itemCategory)}} src="../images/delete.png" />
	                	</div>*/}
                	</div> 
				)

				currentCategory = listItem.itemCategory
			}


			if(listItem.itemCategory == currentCategory) {
				console.log("Running listItem.itemCategory == currentCategory")

				listData.push( 
					<div className="row" key={listItem.id}>
	                	<div className="col-xs-3 text-right">
	                		<div className="">
								<input type="checkbox" className="list-checkbox" />
								<label htmlFor="list-checkbox"></label>
							</div>
						</div>
	                	<div className= 'col-xs-7 item'>{listItem.item}</div>
	                	<div className='col-xs-2'>
	                		{/*<img className='not-visible delete-button' onClick={ ()=> {this.deleteItem(listItem.item, listItem.itemCategory)}} src="../images/delete.png" />*/}
	                		{/*<img className='delete-button' onClick={ ()=> {this.deleteItem(listItem.item, listItem.itemCategory)}} src="../images/delete.png" />*/}
	                	</div>
	                </div> 
				)
			}		
		})


		var finalCategory = "";

		nextProps.listView.map((listItem, index)=>{

			if (listItem.itemCategory !== finalCategory){
				finalCategory = listItem.itemCategory
			}
		})

		// listData.push(
		// 	<div className='row add-item-row'>
		// 		<div className='col-xs-6 col-xs-offset-3'>
		// 			<input className={finalCategory} placeholder="Add Item" />
		// 		</div>
		// 		<div className='col-xs-3'>
		// 			<img className='add-item-button' src="../images/plus.png" onClick={ () => {this.addNewItem(newItemIndex, finalCategory)}} />
		// 		</div>
		// 	</div>
		// )


		this.setState({
			listArray: listData
		})
	}



	addNewItem(item, itemCategory){


		var itemString = 'input.' + itemCategory

		console.log('////ITEM STRING///')
		console.log(itemString)

		var newItem = $(itemString).val()

		console.log('////NEW ITEM///')
		console.log(newItem)

		console.log(this.state.token)
		console.log(this.state.surveyId)
		console.log(this.state.newItem)
		console.log(this.state.itemCategory)
		console.log(this.state.query)

		this.props.userPackingListAction({
			token: this.state.token,
			tripId: this.state.surveyId,
			item: newItem,
			itemCategory: itemCategory,
			query: 'INSERT INTO userListItems (tripId, item, itemCategory) VALUES (?, ?)' 
		})
	}



	deleteItem(item, itemCategory){
		console.log(item)
		console.log(itemCategory)

		this.setState({
			item: item,
			itemCategory: itemCategory,
			query: 'DELETE FROM userListItems WHERE tripId=(?) AND item=(?) AND itemCategory=(?)'
		})

		console.log(this.state.token)
		console.log(this.state.surveyId)
		console.log(this.state.item)
		console.log(this.state.itemCategory)
		console.log(this.state.query)


		this.props.userPackingListAction({
			token: this.state.token,
			tripId: this.state.surveyId,
			item: item,
			itemCategory: itemCategory,
			// query: 'DELETE FROM userListItems WHERE tripId=(?) AND item=(?) AND itemCategory=(?)'
			query: 'DELETE FROM userListItems WHERE tripId=(?) AND item=(?) AND itemCategory=(?)'
		})
	}

// onClick={this.deleteToggle}

	renderDeleteButton(){
		console.log("we are in render delete button")
		console.log(this.state.showDelete)

		if (this.state.showDelete == false) {
			return(
				<div className="delete-toggle col-md-offset-3 col-md-1 col-sm-offset-2 col-sm-1 col-xs-1 text-right" >
					<h5>Remove Items</h5>
				</div>
			)
		}
		else if (this.state.showDelete == true) {
			return(
				<div className="delete-toggle col-md-offset-3 col-md-1 col-sm-offset-2 col-sm-1 col-xs-1 text-right" >
					<h5>Done</h5>
				</div>
			)
		}
	}


	deleteToggle(){
		if (this.state.showDelete) {
			$('.delete-button').addClass('not-visible');
			this.setState({ showDelete: false })
		}
		else {
			$('.delete-button').removeClass('not-visible');
			this.setState({ showDelete: true })
		}
	}

	render(){

		// console.log(this.reduxState)
		// console.log(this.state)

		return(
			<div>
				<WeatherDiv />
				<div className="listview-page">
					<div className="listview-section col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 col-xs-offset-1 col-xs-10">
						<h1 className="text-center">Packing Recommendations</h1>
						{this.renderDeleteButton}
						{this.state.listArray}
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		listView: state.listReducer,
		loginInfo: state.registerReducer,
		surveyId: state.surveyReducer
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		listAction: ListAction,
		userPackingListAction: UserPackingListAction
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ListView);