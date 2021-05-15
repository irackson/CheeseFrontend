import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from 'pages/Index';
import Show from 'pages/Show';

const Main = (props) => {
    const [cheeses, setCheeses] = useState(null);

    const URL =
        process.env.NODE_ENV === 'production'
            ? 'https://irackson-cheese-api.herokuapp.com/cheese'
            : 'http://localhost:4002/cheese';

    const getCheeses = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setCheeses(data);
    };

    const createCheese = async (newCheese) => {
        await fetch(URL, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCheese),
        });
        getCheeses();
    };

    const updateCheese = async (updateCheese, id) => {
        await fetch(`${URL}/${id}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateCheese),
        });
        getCheeses();
    };

    const deleteCheese = async (id) => {
        await fetch(`${URL}/${id}`, {
            method: 'delete',
        });
        getCheeses();
    };

    useEffect(() => {
        getCheeses();
    }, []);

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Index cheeses={cheeses} createCheese={createCheese} />
                </Route>
                <Route
                    path="/cheese/:id"
                    render={(rp) => (
                        <Show
                            cheeses={cheeses}
                            updateCheese={updateCheese}
                            deleteCheese={deleteCheese}
                            {...rp}
                        />
                    )}
                ></Route>
            </Switch>
        </main>
    );
};

export default Main;
