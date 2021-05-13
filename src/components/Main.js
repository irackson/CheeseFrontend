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
        console.log(data);
        setCheeses(data);
    };

    const createCheese = async (newCheese) => {
        await fetch(URL, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCheese),
        });
    };

    useEffect(() => {
        getCheeses();
    }, []);

    if (cheeses) {
        return <h2>{cheeses.map((e) => JSON.stringify(e))}</h2>;
    } else {
        return (
            <main>
                cheeses index page
                <Switch>
                    <Route exact path="/">
                        <Index cheeses createCheese />
                    </Route>
                    <Route
                        path="/cheese/:id"
                        render={(rp) => <Show {...rp} />}
                    />
                </Switch>
            </main>
        );
    }
};

export default Main;
