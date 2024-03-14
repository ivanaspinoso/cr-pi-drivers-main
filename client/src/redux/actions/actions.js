import { GET_TEAMS, GET_BY_ID, GET_BY_NAME, GET_DRIVERS, POST_DRIVER, DELETE_DRIVERS, DELETE_DRIVER_ID, FILTER_BY_BIRTHDATE, FILTER_BY_NAME, FILTER_BY_TEAM, FILTER_BY_ORIGIN } from "./actions-types";
import axios from 'axios';
const REACT_APP_URL_HOST = "http://localhost:3001";

export const getDrivers = () => {
  return async (dispatch) => {
     try {
       const response = await axios.get(`${REACT_APP_URL_HOST}/drivers`);
       dispatch({
         type: GET_DRIVERS,
         payload: response.data,
       });
     } catch (error) {
       console.error(error); // Agrega esta línea para verificar los errores
       return { error: true, message: error.message };
     }
  };
 };
 

export const getTeams = () => {
 return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_URL_HOST}/teams`);
      dispatch({
        type: GET_TEAMS,
        payload: response.data,
      });
    } catch (error) {
      return { error: true, message: error.message };
    }
 };
};

export const getByName = (name) => async (dispatch) => {
  try {
     // Simulando una llamada a la API
     const response = await axios(`http://localhost:3001/driversByname?name=${name}`);
     const data = await response.data[0];
 
     // Despacha una acción para actualizar el estado con los datos obtenidos
     dispatch({ type: GET_BY_NAME, payload: data });
  } catch (error) {
     // Despacha una acción para manejar el error
     dispatch({ type: GET_BY_NAME, error });
  }
 };
 

export const getById = (id) => {
 return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_URL_HOST}/drivers/${id}`);
      dispatch({ type: GET_BY_ID, payload: response.data });
    } catch (error) {
      return { error: true, message: "Error al obtener el conductor por ID" };
    }
 };
};

export const postDriver = (driver) => {
 return async (dispatch) => {
    try {
      const response = await axios.post(`${REACT_APP_URL_HOST}/drivers`, driver);
      dispatch({ type: POST_DRIVER, payload: response.data });
      // En lugar de usar alert, podrías actualizar el estado de la aplicación para mostrar un mensaje de éxito
      return { success: true, message: "Conductor creado correctamente" };
    } catch (error) {
      return { error: true, message: "Verificar que todos los datos para crear al conductor estén completos" };
    }
 };
};

export const filterByBirthdate = (payload) => {
 return {
    type: FILTER_BY_BIRTHDATE,
    payload,
 };
};

export const filterByName = (payload) => {
 return {
    type: FILTER_BY_NAME,
    payload,
 };
};

export const filteredByOrigin = (payload) => {
 return {
    type: FILTER_BY_ORIGIN,
    payload,
 };
};

export const filterByTeam = (payload) => {
 return {
    type: FILTER_BY_TEAM,
    payload,
 };
};

export const deleteDriver = (id) => async (dispatch) => {
 try {
    const response = await axios.delete(`${REACT_APP_URL_HOST}/drivers/${id}`);
    dispatch({
      type: DELETE_DRIVERS,
      payload: response.data,
    });
    return { success: true, message: "Conductor eliminado correctamente" };
 } catch (error) {
    return { error: true, message: "Error al eliminar el conductor" };
 }
};

export const deleteDriverId = () => {
 return {
    type: DELETE_DRIVER_ID,
 };
};