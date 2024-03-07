import {
    GET_BY_ID,
    GET_BY_NAME,
    GET_DRIVERS,
    GET_TEAMS,
    POST_DRIVER,
    FILTER_BY_BIRTHDATE,
    FILTER_BY_NAME,
    FILTER_BY_ORIGIN,
    FILTER_BY_TEAM,
    DELETE_DRIVER_ID,
    DELETE_DRIVERS,
} from "./actions-types";
import axios from "axios";

const REACT_APP_URL_HOST="http://localhost:3001"

export const getDogs=()=>{
    return async (dispatch)=>{
        const response= await axios.get(`${REACT_APP_URL_HOST}/drivers`);
        return dispatch({
            type:GET_DRIVERS,
            payload: response.data,
        })
    }
}

export const getTeams=()=>{
    return async (dispatch)=>{
        try {
            const response = await axios.get(`${REACT_APP_URL_HOST}`)
            dispatch({
                type:GET_TEAMS,
            })
        } catch (error) {
            error(error.message)
        }
    }
}

export const getByName =(name)=>{
    return async(dispatch)=>{
        try {
            const response = await axios.get(`${REACT_APP_URL_HOST}`)
            if (!response.data.length){
                throw new Error("Driver not found")
            }
            dispatch({type:GET_BY_NAME, payload:response.data})
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export const getById=(id)=>{
    return async (dispatch)=>{
        try {
            const response = await axios.get(`${REACT_APP_URL_HOST}`)
            return dispatch({ type: GET_BY_ID, payload: response.data})
        } catch (error) {
            console.error(error.message)
        }
    }
}

export const postDriver =(driver)=>{
    return async(dispatch) =>{
        try {
            const response= await axios.post(`${REACT_APP_URL_HOST}`)
            dispatch({type:POST_DRIVER,payload: response.data})
            alert("Conductor creado correctamente")
            return response;
        } catch (error) {
            alert("Verificar que todos los datos para crear al conductor estén completos")
        }
    }
}

export const filterByTeam= (payload)=>{
    return {
        type: FILTER_BY_TEAM,
        payload,
    }
}

export const filterByBirthdate =(payload)=>{
    return{
        type:FILTER_BY_BIRTHDATE,
        payload,
    }
}

export const filterByOrigin =(payload)=>{
    return{
        type:FILTER_BY_ORIGIN,
        payload,
    }
}

export const filterByName=(payload)=>{
    return {
        type:FILTER_BY_NAME,
        payload,
    }
}

export const deleteDriver=(id)=> async(dispatch)=>{
    try {
        if(!id){
            throw new Error("Invalid ID")
        }
        const response = await axios.delete(`${REACT_APP_URL_HOST}`)
        dispatch({
            type:DELETE_DRIVERS,
            payload: response.data,
        })
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const deleteDriverId=()=>{
    return {
        type: DELETE_DRIVER_ID,
    }
}