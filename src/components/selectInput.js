import { useField } from "formik";

const SelectInput = ({label, options, name}) => {
    const [field, meta] = useField(name);
    return <div>
        <label>
            {label}
            <select {...field}>
                {options.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase()+o.slice(1)}</option>)}
            </select>
            {meta.error && meta.touched && <div>{meta.error}</div>}
        </label>
    </div>
}

export default SelectInput;