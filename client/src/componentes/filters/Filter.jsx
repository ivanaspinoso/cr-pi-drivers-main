
export default function Filter(props) {

    return (
        <div>
            <h2>FILTRAR</h2>
            <div>
                <label>Por Escudería : </label>
                <select onChange={props.handleChange} name='teams' value={props.filterstate.teams}>
                    <option value="--Todos--">--Todos--</option>
                    {[...props.allTeams].sort((a, b) => a.name.localeCompare(b.name)).map(team => (
                        <option key={team.id} value={team.name}>
                            {team.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Por Origen : </label>
                <select onChange={props.handleChange} name='origin' value={props.filterstate.origin}>
                    <option value="--Todos--">--Todos--</option>
                    <option value="API">API</option>
                    <option value="DB">DB</option>
                </select>
            </div>
        </div>
    );

}