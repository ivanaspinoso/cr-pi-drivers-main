// DriversList.js
import React from 'react';
import Drivers from '../drivers/Drivers';

const DriversList = ({ drivers }) => {
    return (
        <div style={{display:'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                        {drivers.map((driver) => (
                <Drivers
                    key={driver.id}
                    id={driver.id}
                    forename={driver.forename}
                    surname={driver.surname}
                    nationality={driver.nationality}
                    image={driver.image.url}
                    dob={driver.dob}
                    description={driver.description}
                    teams={driver.teams}
                    createInDb={driver.createInDb}
                />
            ))}
        </div>
    );
};

export default DriversList;
