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
                // Asumiendo que action.payload es "asc" o "desc" para ordenar por fecha de nacimiento
                const sortedDriversByBirthdate = [...state.drivers].sort((a, b) => {
                    const dateA = new Date(a.dob);
                    const dateB = new Date(b.dob);
                    return action.payload === "asc" ? dateA - dateB : dateB - dateA;
                });
                return {
                    ...state,
                    drivers: sortedDriversByBirthdate,
                    driversCopy: sortedDriversByBirthdate, // Asegurarse de que driversCopy se actualice también
                };
        case FILTER_BY_TEAM:
                    const filteredByTeam = state.drivers.filter(driver => driver.teams.includes(action.payload) || action.payload === "All");
                    return {
                        ...state,
                        drivers: filteredByTeam,
                        driversCopy: filteredByTeam, // Asegurarse de que driversCopy se actualice también
                    };
        case FILTER_BY_ORIGIN:
                const filteredByOrigin = state.drivers.filter(driver => driver.origin === action.payload || action.payload === "all");
                return {
                    ...state,
                    drivers: filteredByOrigin,
                    driversCopy: filteredByOrigin, // Asegurarse de que driversCopy se actualice también
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