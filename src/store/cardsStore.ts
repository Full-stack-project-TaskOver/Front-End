// REDUX ZONE !!!
import { createStore } from "redux"
import cardData from "../Component/PECS/CardsData";

const initCard = {data: []};
const cardReducer = (state:any = initCard, action:any) =>{
    console.log(action.payload, "action");
    console.log(state.data, "state");
    console.log(action.type.name);
    
    
    console.log();

    if(state.data.length){
        if(action.type.name === "addPECS"){
            let poped = state.data.pop()
            state.data.push(poped)  
            if(poped == action.payload){
             return state
            }else{
             return {...state, data: state.data.concat(action.payload)}
            }
        }
    }

    if(action.type.name === "addPECS"){

        return {...state, data: state.data.concat(action.payload)}   
    }

    if(action.type.name === "delPECS"){
        console.log(state.data,"delPECS");
        console.log(action.payload,"delPECS");
        let newArr = state.data.filter((e:any, i:any)=> i !== action.payload)
        return {...state, data: newArr}
    }

    if(action.type.name === "delAllPECS"){
    console.log("All");
    
        return {...state, data: []}
    }

    return state;
}
const store = createStore(cardReducer);

// App init --> run store --> action(none) --> card reducer --> {}

export default store;
// REDUX ZONE !!!