import { useField } from "formik";

const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return <div>
        <label>
            {label}
            <input {...field} {...props} />
            {meta.touched && meta.error && <div>{meta.error}</div>}
        </label>
    </div>
}

export default TextInput