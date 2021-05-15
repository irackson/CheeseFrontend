import { useState } from 'react';
import { Link } from 'react-router-dom';

const Index = (props) => {
    const [newForm, setNewForm] = useState({
        name: '',
        countryOfOrigin: '',
        image: '',
    });

    const handleChange = (event) => {
        setNewForm({ ...newForm, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.createCheese(newForm);
        setNewForm({
            name: '',
            countryOfOrigin: '',
            image: '',
        });
    };

    const loaded = () => {
        console.log(props.cheeses.length);
        return (
            <>
                {props.cheeses.map((cheese) => (
                    <div key={cheese._id} className="cheese">
                        <Link to={`/cheese/${cheese._id}`}>
                            <h1>{cheese.name}</h1>
                        </Link>
                        <img
                            src={cheese.image}
                            style={{ width: '100px', height: '100px' }}
                            alt={cheese.name}
                        />
                        <h3>{cheese.countryOfOrigin}</h3>
                    </div>
                ))}
            </>
        );
    };

    const loading = () => {
        return <h1>Loading...</h1>;
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="image"
                    placeholder="image"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="countryOfOrigin"
                    placeholder="countryOfOrigin"
                    onChange={handleChange}
                />
                <input type="submit" value="New Cheese" />
            </form>
            {props.cheeses ? loaded() : loading()}
        </section>
    );
};

export default Index;
