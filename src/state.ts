import DOMGrid from './util/dom-grid';

const W = window as any;

// global unreactive app state
W.APP_STATE = {
    cell_color: "#17A2B8",

    grid: new DOMGrid(),
};

export default W;
