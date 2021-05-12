import 'App.scss';

function App() {
    const apiURL =
        process.env.NODE_ENV === 'production'
            ? 'https://irackson-cheese-api.herokuapp.com/'
            : 'http://localhost:4001/';

    return <div className="App">hello world</div>;
}

export default App;
