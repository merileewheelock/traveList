export default function(state = [], action){
	if (action.type === "PROFILE"){
		return action.payload;
	}else{
		return state;
	}
}