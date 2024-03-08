import { GET_TEAMS,GET_BY_ID,GET_BY_NAME,GET_DRIVERS,FILTER_BY_BIRTHDATE,FILTER_BY_NAME,FILTER_BY_ORIGIN,FILTER_BY_TEAM, DELETE_DRIVERS,DELETE_DRIVER_ID,POST_DRIVER } from "../actions/actions-types";

const initialState = {
    drivers: [],
    driver: undefined,
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
                driver: action.payload,
            };
        case GET_BY_ID:
            return {
                ...state,
                details: action.payload,
            };
        case POST_DRIVER:
            return {
                ...state,
                drivers: [...state.drivers, action.payload],
            };
        case FILTER_BY_TEAM:
            const allDrivers = state.driversCopy;
            const filterDriver = action.payload === "All" ? allDrivers : allDrivers.filter(driver => driver.teams?.includes(action.payload));
            const filterdB = [];
            allDrivers.forEach(driver => {
                if (typeof driver.id === "string") {
                    driver.teams?.forEach(teamDb => {
                        if (teamDb === action.payload) filterdB.push(teamDb);
                    });
                }
            });
            return {
                ...state,
                drivers: filterDriver.concat(filterdB),
                error: null,
            };
        case FILTER_BY_BIRTHDATE:
            const sortedDriversByBirthdate = [...state.drivers];
            const birthdateAscendingOrder = action.payload === "min";
            sortedDriversByBirthdate.sort((first, second) => {
                const dateA = new Date(first.dob);
                const dateB = new Date(second.dob);
                return birthdateAscendingOrder ? dateA - dateB : dateB - dateA;
            });
            return {
                ...state,
                drivers: sortedDriversByBirthdate,
            };
        case FILTER_BY_NAME:
            const filteredByName = state.driversCopy.filter(driver => driver.name.toLowerCase().includes(action.payload.toLowerCase()));
            return {
                ...state,
                drivers: filteredByName,
            };
        case FILTER_BY_ORIGIN:
            const filteredByOrigin = action.payload === "API" ? state.driversCopy.filter(driver => driver.origin === "API") : state.driversCopy.filter(driver => driver.origin !== "API");
            return {
                ...state,
                drivers: filteredByOrigin,
            };
        case DELETE_DRIVERS:
            // Handle deletion of drivers from state
            return {
                ...state,
                drivers: state.drivers.filter(driver => driver.id !== action.payload),
            };
        case DELETE_DRIVER_ID:
            // Handle deletion of driver by id from state
            return {
                ...state,
                drivers: state.drivers.filter(driver => driver.id !== action.payload),
            };
        default:
            return state;
    }
};

export default reducer;
