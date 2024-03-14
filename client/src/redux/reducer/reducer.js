import { GET_TEAMS, GET_BY_ID, GET_BY_NAME, GET_DRIVERS, FILTER_BY_BIRTHDATE, FILTER_BY_NAME, FILTER_BY_ORIGIN, FILTER_BY_TEAM, DELETE_DRIVERS, DELETE_DRIVER_ID, POST_DRIVER, RESET_DRIVERS } from "../actions/actions-types";

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
            case RESET_DRIVERS:
                return {
                    ...state,
                    driver: undefined,
                };
        case POST_DRIVER:
            return {
                ...state,
                drivers: [...state.drivers, action.payload],
                driversCopy: [...state.driversCopy, action.payload], // Asegurarse de que driversCopy se actualice también
            };
            case FILTER_BY_ORIGIN:
                // Filtrar por origen, pero mantener una copia de los conductores originales
                const filteredByOrigin = state.driversCopy.filter(driver => driver.origin === action.payload || action.payload === "all");
                return {
                  ...state,
                  drivers: filteredByOrigin,
                  // No actualizamos driversCopy aquí porque queremos mantener la lista original
                };

                case FILTER_BY_TEAM:
    // Suponiendo que quieres aplicar múltiples filtros y mantener un estado separado para el resultado
    let filteredDrivers = state.driversCopy; // Comienza con los datos originales

    // Aplica el filtro por equipo
    filteredDrivers = filteredDrivers.filter(driver => {
        if (driver.teams) {
            return driver.teams.includes(action.payload) || action.payload === "All";
        }
        return false;
    });

    // Aquí podrías aplicar más filtros a filteredDrivers si es necesario

    return {
        ...state,
        drivers: filteredDrivers, // Actualiza el estado con los conductores filtrados
    };




                case FILTER_BY_BIRTHDATE:
                    // Asumiendo que action.payload es "asc", "desc" o "sin orden" para ordenar por fecha de nacimiento
                    let sortedDriversByBirthdate;
                    if (action.payload === "asc" || action.payload === "desc") {
                        // Ordenar por fecha de nacimiento
                        sortedDriversByBirthdate = [...state.drivers].sort((a, b) => {
                            const dateA = new Date(a.dob);
                            const dateB = new Date(b.dob);
                            return action.payload === "asc" ? dateB - dateA : dateA - dateB;
                        });
                    } else if (action.payload === "sin orden") {
                        // Ordenar de manera aleatoria
                        sortedDriversByBirthdate = [...state.drivers].sort(() => Math.random() - 0.5);
                    }
                    return {
                        ...state,
                        drivers: sortedDriversByBirthdate,
                    };
                
                    case FILTER_BY_NAME:
                        // Asumiendo que action.payload es "asc" o "desc" para ordenar por nombre
                        const sortedDriversByName = [...state.driversCopy].sort((a, b) => {
                            return action.payload === "asc" ? a.forename.localeCompare(b.forename) : b.forename.localeCompare(a.forename);
                        });
                        return {
                            ...state,
                            drivers: sortedDriversByName,
                        };
                    
           
        case DELETE_DRIVERS:
            // Handle deletion of drivers from state
            return {
                ...state,
                drivers: state.drivers.filter(driver => driver.id !== action.payload),
                driversCopy: state.driversCopy.filter(driver => driver.id !== action.payload), // Asegurarse de que driversCopy se actualice también
            };
        case DELETE_DRIVER_ID:
            // Handle deletion of driver by id from state
            return {
                ...state,
                drivers: state.drivers.filter(driver => driver.id !== action.payload),
                driversCopy: state.driversCopy.filter(driver => driver.id !== action.payload), // Asegurarse de que driversCopy se actualice también
            };
            
        default:
            return state;
    }
};

export default reducer;