export default function OrderSec(props) {

    return (
        <div>
            <h2>ORDENAR</h2>
            <div>
                <input type="radio" id="por_nombre" name="tipo" value={'name'} onChange={props.handleChange} />
                <label htmlFor="por_nombre">Por Nombre</label>
                <input type="radio" id="por_nacimiento" name="tipo" value={'birth'} onChange={props.handleChange} />
                <label htmlFor="por_nacimiento">Por Nacimiento</label>
            </div>
            <div>
                <input type="radio" id="asc" name="asc_desc" value={'ASC'} onChange={props.handleChange} disabled={!props.orderstate.tipo} />
                <label htmlFor="asc">ASC</label>
                <input type="radio" id="desc" name="asc_desc" value={'DESC'} onChange={props.handleChange} disabled={!props.orderstate.tipo} />
                <label htmlFor="desc">DESC</label>
            </div>
        </div>
    );

}