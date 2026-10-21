export default function Input(props) {
    return (
        <label>{props.label}
            <input
                type="text"
                placeholder={props.placeholder}
                name={props.name}
                onChange={props.onChange}
            />
        </label>
    )
}