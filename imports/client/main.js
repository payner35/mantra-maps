import {initContext} from './configs/context';
import {createApp} from 'mantra-core';
import injectTapEventPlugin from 'react-tap-event-plugin';


//modules
import coreModule from './modules/core';
import mapModule from './modules/map';


const reducers = ({
    ...coreModule.reducers,
    ...mapModule.reducers
});


// init context
const context = initContext({ reducers });

//create client
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(mapModule);

app.init();
injectTapEventPlugin();


//https://github.com/kadirahq/meteor-dochead
var viewportInfo = {name: "viewport", content:"user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"};
var linkInfo = {rel: "stylesheet", href: "https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"};
DocHead.addLink(linkInfo);
DocHead.addMeta(viewportInfo);



