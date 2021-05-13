import { useState } from 'react';
import { Link } from 'react-router-dom';

const Show = (props) => {
    const loaded = () => {
        console.log(props.cheeses.length);
        const cheese = props.cheeses.filter(
            (e) => e._id === props.match.params.id
        )[0];
        // return <p>asdf</p>;
        return <h3>{cheese.countryOfOrigin}</h3>;
    };

    const loading = () => {
        return <h1>Loading...</h1>;
    };

    return props.cheeses ? loaded() : loading();
};

export default Show;
