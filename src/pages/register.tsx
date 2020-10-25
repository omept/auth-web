import { FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
export type RegisterProps = {

}
export const Register: React.FC<RegisterProps> = ({ }) => {

    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: "", password: "", email: "", name: "" }} onSubmit={submitRegForm}>
                {({ isSubmitting }) => (
                    <Form>
                        {/* Easy Way */}
                        <InputField name='name' placeholder="full name" label='Name' type="text" />

                        {/* Easy Way */}
                        <InputField name='email' placeholder="email" label='Email' type="email" />

                        {/* Hard war */}
                        {/* <FormControl marginTop="2rem">
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input id="username" placeholder="username or email" /> */}
                        {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                        {/* </FormControl> */}

                        {/* Easy Way */}
                        <InputField name="username" placeholder="username" label="Username" type="text" />

                        {/* Easy Way */}
                        <InputField name="password" placeholder="password" label="Password" type="password" />

                        <Button mt="2rem" float="right" isLoading={isSubmitting} type="submit" color="teal">Register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};


const submitRegForm = (values) => {
    console.log(values);
}

export default Register;