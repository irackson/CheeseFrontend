import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Index = (props) => {
    const formRef = useRef(null);
    const firstInput = useRef(null);
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
        formRef.current.reset();
        firstInput.current.focus();
    };

    const loaded = () => {
        return (
            <>
                {props.cheeses.map((cheese) => (
                    <div key={cheese._id} className="cheese">
                        <Link to={`/cheese/${cheese._id}`}>
                            <h1>{cheese.name}</h1>
                        </Link>
                        {cheese.image ? (
                            <img
                                src={cheese.image}
                                style={{ width: '100px', height: '100px' }}
                                alt={cheese.name}
                            />
                        ) : null}
                        {cheese.countryOfOrigin ? (
                            <h3>{cheese.countryOfOrigin}</h3>
                        ) : null}
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
            <form
                ref={formRef}
                onSubmit={(event) => handleSubmit(event) && this.res}
            >
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="name"
                    onChange={handleChange}
                    ref={firstInput}
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
