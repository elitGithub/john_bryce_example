// Note: in a real life scenario, this would probably sit in the backend

import Renderer from "./Renderer";
export default class Router {
    constructor() {
        // var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + window.location.search
        this.url = window.location;
    }

    getPathName() {
        return this.url.pathname;
    }

    static rerender(pathname) {
        return new Router().resolve(pathname);
    }

    resolve(pathname) {
        // Routes.
        switch (pathname) {
            case '/':
                document.body.appendChild(Renderer.homeView())
                break;
            case '/shop':
                document.querySelector('.hero').remove();
                document.body.appendChild(Renderer.productsView());
                Renderer.addLogicToButtons();
                break;
            default:
                const div = document.createElement('div');
                div.innerHTML = `<h1>Not Found</h1> <br /> <p>${pathname}</p>`;
                return div;
        }
    }
}