import { GET_TEAMS, GET_BY_ID, GET_BY_NAME, GET_DRIVERS, FILTER_BY_BIRTHDATE, FILTER_BY_NAME, FILTER_BY_ORIGIN, FILTER_BY_TEAM, DELETE_DRIVERS, DELETE_DRIVER_ID, POST_DRIVER, RESET_DRIVERS } from "../actions/actions-types";

const initialState = {
    drivers: [],
    driversByname: undefined,
    driversCopy: [],
    teams: [],
    details: [],
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DRIVERS:
            return {
                ...state,
                drivers: action.payload,
                driversCopy: action.payload,
            };
        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload,
            };
        case GET_BY_NAME:
            return {
                ...state,
                driversByname: action.payload,
            };
        case GET_BY_ID:
            return {
                ...state,
                details: action.payload,
            };
        case RESET_DRIVERS:
            return {
                ...state,
                driversByname: undefined,
            };
        case POST_DRIVER:
            return {
                ...state,
                drivers: [...state.drivers, action.payload],
                driversCopy: [...state.driversCopy, action.payload],
            };
        case FILTER_BY_ORIGIN:
            const filteredByOrigin = state.drivers?.filter(driver => driver.origin === action.payload || action.payload === "all") || state.drivers.filter(driver => driver.origin === action.payload || action.payload === "all");
            return {
                ...state,
                drivers: filteredByOrigin,
                driversByname: filteredByOrigin,
            };
        case FILTER_BY_TEAM:
            const filteredByTeam = state.driversByname?.filter(driver => driver.teams.includes(action.payload) || action.payload === "All") || state.drivers.filter(driver => driver.teams.includes(action.payload) || action.payload === "All");
            return {
                ...state,
                drivers: filteredByTeam,
                driversByname: filteredByTeam,
            };
        case FILTER_BY_BIRTHDATE:
            let sortedDriversByBirthdate;
            if (state.driversByname?.length > 0) {
                sortedDriversByBirthdate = [...state.driversByname].sort((a, b) => {
                    const dateA = new Date(a.dob);
                    const dateB = new Date(b.dob);
                    return action.payload === "asc" ? dateA - dateB : dateB - dateA;
                });
            } else {
                sortedDriversByBirthdate = [...state.driversCopy].sort((a, b) => {
                    const dateA = new Date(a.dob);
                    const dateB = new Date(b.dob);
                    return action.payload === "asc" ? dateA - dateB : dateB - dateA;
                });
            }
            return {
                ...state,
                drivers: sortedDriversByBirthdate,
                driversByname: sortedDriversByBirthdate,
            };
        case FILTER_BY_NAME:
            let sortedDriversByName;
            if (state.driversByname?.length > 0) {
                sortedDriversByName = [...state.driversByname].sort((a, b) => {
                    return action.payload === "asc" ? a.forename.localeCompare(b.forename) : b.forename.localeCompare(a.forename);
                });
            } else {
                sortedDriversByName = [...state.driversCopy].sort((a, b) => {
                    return action.payload === "asc" ? a.forename.localeCompare(b.forename) : b.forename.localeCompare(a.forename);
                });
            }
            return {
                ...state,
                drivers: sortedDriversByName,
                driversByname: sortedDriversByName,
            };
        case DELETE_DRIVERS:
            return {
                ...state,
                drivers: state.drivers.filter(driver => driver.id !== action.payload),
                driversCopy: state.driversCopy.filter(driver => driver.id !== action.payload),
            };
        case DELETE_DRIVER_ID:
            return {
                ...state,
                drivers: state.drivers.filter(driver => driver.id !== action.payload),
                driversCopy: state.driversCopy.filter(driver => driver.id !== action.payload),
            };
        default:
            return state;
    }
};

export default reducer;


