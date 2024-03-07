import { GET_TEAMS,GET_BY_ID,GET_BY_NAME,GET_DRIVERS,POST_DRIVER,DELETE_DRIVERS,DELETE_DRIVER_ID } from "./actions-types";

export const getDrivers = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${REACT_APP_URL_HOST}/drivers`);
        dispatch({
          type: GET_DRIVERS,
          payload: response.data,
        });
      } catch (error) {
        console.error(error.message);
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
        console.error(error.message);
      }
    };
  };
  
  export const getByName = (name) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${REACT_APP_URL_HOST}/drivers?name=${name}`);
        dispatch({ type: GET_BY_NAME, payload: response.data });
      } catch (error) {
        console.error(error.message);
        throw new Error("Error al obtener el conductor por nombre");
      }
    };
  };
  
  export const getById = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${REACT_APP_URL_HOST}/drivers/${id}`);
        dispatch({ type: GET_BY_ID, payload: response.data });
      } catch (error) {
        console.error(error.message);
        throw new Error("Error al obtener el conductor por ID");
      }
    };
  };
  
  export const postDriver = (driver) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`${REACT_APP_URL_HOST}/drivers`, driver);
        dispatch({ type: POST_DRIVER, payload: response.data });
        alert("Conductor creado correctamente");
        return response;
      } catch (error) {
        console.error(error.message);
        alert("Verificar que todos los datos para crear al conductor estén completos");
      }
    };
  };
  
  export const deleteDriver = (id) => async (dispatch) => {
    try {
      const response = await axios.delete(`${REACT_APP_URL_HOST}/drivers/${id}`);
      dispatch({
        type: DELETE_DRIVERS,
        payload: response.data,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el conductor");
    }
  };
  
  export const deleteDriverId=()=>{
    return {
        type: DELETE_DRIVER_ID,
    }
}

