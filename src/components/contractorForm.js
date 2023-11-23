import { Formik, Form } from "formik";
import * as Yup from 'yup';
import TextInput from "./textInput";
import SelectInput from "./selectInput";
import JpgInput from "./jpgInput";

const ContractorForm = ({ name = '', surname = '', avatar = '', type = 'person', id = '' }) => {
    const contractorSchema = Yup.object({
        name: Yup.string()
            .max(20, 'Name cant be longer than 20 characters')
            .required('Name is required'),
        surname: Yup.string()
            .max(30, 'Surname cant be longer than 30 characters')
            .required('Surname is required'),
        avatar: Yup.mixed()
            .test('is-image-aspect-ratio-square', 'Image isnt in 1:1 aspect ratio', (val) => {
                const img = new Image();
                img.src = val;
                if (img.height !== img.width) return true;
                else return false;
            }),
        type: Yup.string()
            .test('is-person-or-company',
                'Select a person or company contractor type',
                val => {
                    return /(person|company)/.test(val);
                }
            ),
        id: Yup.string()
            .test("is-type-set", "Select a contractor type first", (val, ctx) => {
                console.log('validating id');
                if (ctx.parent.type !== 'person' && ctx.parent.type !== 'company') {
                    return false;
                }
                else return true;
            })
            .test("is-nip-correct", "NIP number incorrect", (val, ctx) => {
                if (ctx.parent.type === 'company' && !(/^[0-9]{10}$/.test(val))) return false
                else return true;
            })
            .test("is-pesel-correct", "PESEL number incorrect", (val, ctx) => {
                if (ctx.parent.type === 'person' && !(/^[0-9]{11}$/.test(val))) return false
                else return true;
            })
    });
    return <div>
        <h1>Contractor Form</h1>
        <Formik
            initialValues={{
                name,
                surname,
                avatar,
                type,
                id,
                colors: '',
            }}
            validationSchema={contractorSchema}
            onSubmit={
                (values) => alert('cool')
            }
        >
            {({ values }) => (
                <Form>
                    <TextInput
                        label='First name'
                        name='name'
                        type='text'
                    />

                    <TextInput
                        label='Last name'
                        name='surname'
                        type='text'
                    />

                    <SelectInput
                        label={'Contractor type'}
                        options={['person', 'company']}
                        name={'type'}
                    />

                    <TextInput
                        label={values.type === 'person' ? 'PESEL' : 'NIP'}
                        name='id'
                        type='text'
                    />

                    <JpgInput
                        label={"Picture"}
                        name="avatar"
                    />

                    {values.avatar && <picture>
                        <img src={values.avatar} alt="avatar"></img>
                    </picture>}

                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
}

export default ContractorForm;