export default function(state = [], action){
	if (action.type === "LISTVIEW"){
		return action.payload;
	}else{
		return state;
	}
}