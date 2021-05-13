import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from 'pages/Index';
import Show from 'pages/Show';

const Main = (props) => {
    const [cheese, setCheese] = useState(null);

    const URL =
        process.env.NODE_ENV === 'production'
            ? 'https://irackson-cheese-api.herokuapp.com/'
            : 'http://localhost:4002/cheese';

    const getCheese = async () => {
        const response = await fetch(URL);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setCheese(data);
    };

    const createCheese = async (newCheese) => {
        // await fetch(URL);
    };

    useEffect(() => {
        getCheese();
    }, []);

    if (cheese) {
        return <h2>{JSON.stringify(cheese)}</h2>;
    } else {
        return (
            <main>
                cheese index page
                <Switch>
                    <Route exact path="/">
                        <Index />
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
