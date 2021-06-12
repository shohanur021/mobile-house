import React from 'react';

const NoFound = () => {
    const errorStyle = {
        color:'red',
        textAlign:'center',
        marginTop:'100px'
    }
    return (
        <div style={errorStyle}>
            <h1>Page not found</h1>
            <h3>404 Error</h3>
        </div>
    );
};

export default NoFound;