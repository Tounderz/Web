import React, { useContext } from 'react';
import { Context } from '../index';

const ErrorPage = () => {
    const {error} = useContext(Context)

    return (
        <h1 
            className='d-flex justify-content-center align-items-center mt-3'
        >
            {error.messageError}
        </h1>
    );
};

export default ErrorPage;