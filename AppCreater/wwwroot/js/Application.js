/**
 * Application start point
 * @constructor
 */

class MainApplication extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.innerHTML = 
           `

          <style>       
            :host { display: flex; background-color:rgba(0,0,255,0.1); height:100%; width:100%;}
            .toolbar_container{width: 100%; height: 3rem; background-color:gray; z-index:2; positin:fixed; display:flex; justify-content:center;}
            .toolbar_input{min-width: 50%; height: 3rem; background-color:white; z-index:2;}
            .masterContainer{width:100%; height:100%;}
          </style>

<div class='toolbar_container'>
    <input type='text'; class='toolbar_input'></div>
    <button class='toolbar_button-apply'></button>
</div>
<div class='master-container' id='mainBlock'</div>
`;
        this.toolbarInput = shadowRoot.querySelector('.toolbar_input');
        this.mainBlock = shadowRoot.querySelector('#mainBlock');
        this.toolbarButtonApply = shadowRoot.querySelector('.toolbar_button-apply');
        this.toolbarButtonApply.addEventListener('click', this.__processUserInput.bind(this));
    }

    __processUserInput(aaa, bbb) {
        const toolbarInputValue = this.toolbarInput.value;
        if (!toolbarInputValue) {
            return;
        }
        /*
        debugger
        fetch(new Request('home/', {
            method: 'GET',
            headers: new Headers(),
            mode: 'cors',
            cache: 'default'
        }));
        debugger
        */
        const inputInformation = this.__getInputInformation(toolbarInputValue);
        const component = this.__getComponentFromInput(inputInformation);
        this.__addComponentToDom(component, inputInformation);
    }

    __getInputInformation(toolbarInputValue) {
        const parsedInput = toolbarInputValue.match(/(name\s\w+)|((width|left|right|top|bottom)\s\d+)|(background\s\w+)|((into)\s\w+)/g);
        let inputInformation = {};
        parsedInput.forEach(value => inputInformation[value.split(' ')[0]] = value.split(' ')[1]);
        return inputInformation;
    }

    __getComponentFromInput(inputInformation) {
        return `<div id='${inputInformation.name}'; 
            style='
                width: ${inputInformation.width};
                left: ${inputInformation.left};
                right: ${inputInformation.right};
                top: ${inputInformation.top};
                bottom: ${inputInformation.bottom};
                background: ${inputInformation.background};
            '></div>`
    }

    __addComponentToDom(component, inputInformation) {
        var div = document.createElement('div');
        div.innerHTML = component;
        var elements = div.firstChild;

        this.mainBlock.appendChild(elements);
    }
}
customElements.define('main-application', MainApplication);
