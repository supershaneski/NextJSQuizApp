import { Provider } from 'react-redux';
import store from '../redux/store';
import App from 'next/app';
import Head from 'next/head';
import { shuffleArray } from  '../lib/utils';
import '../style/app.css';

export default function MyApp({ Component, questions, rawdata, pageProps }) {
    const siteTitle = process.env.SiteTitle || 'NextJS';
    
    const props = {
        rawdata,
        ...pageProps
    }
    
    // init quiz
    store.dispatch({
        type: 'INIT_QUIZ',
        payload: questions
    })
    // store rawdata for reset
    store.dispatch({
        type: 'SET_DATA',
        payload: rawdata
    })

    return (
        <>
        <Provider store={store}>
            <Head>
                <title>{ siteTitle }</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <main>
            <Component { ...props } />
            </main>
        </Provider>
        <style jsx>
            {`
            main {
                background-color: #f5f5f5;
                position: absolute;
                width: 100%;
                height: 100%;
            }
            `}
        </style>
        </>
    )
}

MyApp.getInitialProps = async (appContext) => {
    
    // get pageprops
    const appProps = await App.getInitialProps(appContext);
    
    // get the quiz data from json files
    var rawdata = (context => {
        const keys = context.keys();
        const values = keys.map(context)
        const data = keys.map((key, index) => {
            const slug = key
              .replace(/^.*[\\\/]/, '')
              .split('.')
              .slice(0, -1)
              .join('.')
            
            const { category, question, answers } = values[index];
            
            // randomize answers
            shuffleArray(answers);

            const data = {
                category,
                question,
                answers
            }
            
            return {
              data,
              slug,
            }
        });        
        return data;
    })(require.context('../data', true, /\.json$/));
    
    // randomize question
    shuffleArray(rawdata);

    // maxcount taken from config file
    const max_count = process.env.MaxCount; //10;
    var questions = [];

    if(rawdata.length > max_count) {
        questions = rawdata.slice(0, max_count);
    } else {
        questions = rawdata;
    }
    
    return {
        questions,
        rawdata,
        ...appProps
    }
}