/**
 * Application start point
 * @constructor
 */

class MainApplication extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });//todo id element like placeholder 4
        shadowRoot.innerHTML = //todo fix layout, elements list 3
           `
          <style>       
            :host { display: flex; background-color:rgba(0,0,255,0.1); height:100%; width:100%;}
            .toolbar_container{width: 100%; height: 3rem; background-color:gray; z-index:2; position:fixed; display:flex; justify-content:center;}
            .toolbar_input{min-width: 50%; height: 3rem; background-color:white; z-index:2;}
            .master-container{width:100%; height:100%;}
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
        this.styleProperties = ['width', 'height', 'left', 'right', 'top', 'bottom'];
        this.tagProperties = ['div', 'input', 'button'];
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
        const component = this.__getComponentFromInput(inputInformation.tag, inputInformation.style, inputInformation.context);
        this.__addComponentToDom(component, inputInformation.context);
    }

    __getInputInformation(toolbarInputValue) {
        //todo add history
        const tagRegExp = new RegExp(`create\\s(${this.tagProperties.join('|')})`, 'g');
        const styleRegExp = new RegExp(`((${this.styleProperties.join('|')})\\s[0-9]{1,3}\\s*[\\%a-zA-Z]{1,6})|(background\\s\\w+)`, 'g');
        const contextRegExp = new RegExp(`(name\\s\\w+)|((into)\\s\\w+)`, 'g');

        let tagRegExpOutput = {};
            toolbarInputValue.match(tagRegExp).forEach(value => tagRegExpOutput[value.split(' ')[0]] = value.split(' ')[1]);
        let styleRegExpOutput = {};
            toolbarInputValue.match(styleRegExp).forEach(value => styleRegExpOutput[value.split(' ')[0]] = value.split(' ')[1]);
        let contextRegExpOutput = {};
            toolbarInputValue.match(contextRegExp).forEach(value => contextRegExpOutput[value.split(' ')[0]] = value.split(' ')[1]);

        const inputInformation = {
            tag: tagRegExpOutput,
            style: styleRegExpOutput,
            context: contextRegExpOutput
        };
        return inputInformation;
    }

    __getComponentFromInput(tag, style, context) {
        const styleList = [];
        for (const prop in style) styleList.push(`${prop}: ${style[prop]}`);
        const componentTag = tag.create || 'div';

        return `<${componentTag} id='${context.name}'; style='${styleList.join(';')}'></${componentTag}>`
    }

    __addComponentToDom(component, inputInformation) {
        var div = document.createElement('div');
        div.innerHTML = component;
        var elements = div.firstChild;
        const intoId = inputInformation.into;
        if (intoId === 'mainBlock') {
            this.mainBlock.appendChild(elements);
        } else {
            const elem = this.mainBlock.querySelector(`#${intoId}`);
            if (elem) {
                elem.appendChild(elements);
            } else {
                console.log('no element exists');
            }
        }
    }
}
customElements.define('main-application', MainApplication);
