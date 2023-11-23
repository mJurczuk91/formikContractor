import { useField } from "formik";

const JpgInput = ({ label, ...props }) => {
    const [{value, ...rest}, meta, helpers] = useField(props.name);
    const field = {
        ...rest, 
        onChange: (e) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                    helpers.setValue(fileReader.result, true);
                }
            }
            if(e.target.files[0]) fileReader.readAsDataURL(e.target.files[0]);
        }
    }
    return <div>
        <label>
            {label}
            <input {...field} {...props} type="file" accept="image/jpeg, image/jpg" />
            {meta.error && meta.touched && <div>{meta.error}</div>}
        </label>
    </div>
}

export default JpgInput;