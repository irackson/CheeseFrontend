import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Show = (props) => {
    const processDelete = (event, id) => {
        event.preventDefault();
        props.deleteCheese(id);
        props.history.push('/');
    };
    const processUpdate = (event, originalCheese, id) => {
        event.preventDefault();
        // console.log
        props.updateCheese({ ...originalCheese, ...editForm }, id);
        // setEditForm({ ...originalCheese, ...editForm });
    };

    const [editForm, setEditForm] = useState(null);

    const handleChange = (event) => {
        setEditForm({ ...editForm, [event.target.name]: event.target.value });
    };

    const loaded = () => {
        const cheese = props.cheeses.filter(
            (e) => e._id === props.match.params.id
        )[0];

        return typeof cheese === 'undefined' ? (
            <Redirect to="/" />
        ) : (
            <div>
                <h1>
                    {typeof editForm?.name === 'string'
                        ? editForm.name
                        : cheese.name}
                </h1>
                {cheese.image ? (
                    <img
                        src={cheese.image}
                        style={{ width: '100px', height: '100px' }}
                        alt={cheese.name}
                    />
                ) : null}
                {cheese.countryOfOrigin ? (
                    <h3>
                        {typeof editForm?.countryOfOrigin === 'string'
                            ? editForm.countryOfOrigin
                            : cheese.countryOfOrigin}
                    </h3>
                ) : null}
                <form
                    onChange={(event) => handleChange(event)}
                    onSubmit={(event) =>
                        processUpdate(event, cheese, cheese._id)
                    }
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={
                            typeof editForm?.name === 'string'
                                ? editForm.name
                                : cheese.name
                        }
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="image"
                        value={
                            typeof editForm?.image === 'string'
                                ? editForm.image
                                : cheese.image
                        }
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="countryOfOrigin"
                        placeholder="country of origin"
                        value={
                            typeof editForm?.countryOfOrigin === 'string'
                                ? editForm.countryOfOrigin
                                : cheese.countryOfOrigin
                        }
                        onChange={handleChange}
                    />
                    <button type="submit">Update Cheese</button>
                </form>
                <form onSubmit={(event) => processDelete(event, cheese._id)}>
                    <button type="submit">Delete Cheese</button>
                </form>
            </div>
        );
    };

    const loading = () => {
        return <h1>Loading...</h1>;
    };

    return props.cheeses ? loaded() : loading();
};

export default Show;
