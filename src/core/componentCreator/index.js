import toKebabCase from '../../utils/toKebabCase.js';

function defineComponent() {
  class SmallPro extends HTMLElement {
  
    constructor() {
      super();

      this.innerHTML = `
        <h1>SmallPro</h1>
      `
    }
  
    connectedCallback() {
      
    }
  
  }

  return SmallPro;
}

/**
 * 
 * @param {component} component 
 */
export function createComponent(parent, Component) {
  
  if (Component.then) {
    Component.then(obj => {
      // console.log('obj', obj);
      define(obj.HomePage)
    });
  } else {
    define(Component)
  }


  function define(Component) {
    const Result = defineComponent();

    Object.keys(Component.methods).forEach(method => {
    //   // if (method === 'render') {   
    //   //   // console.log('HomePage.prototype', HomePage.prototype);
    //   //   spec.methods[method].bind(HomePage.prototype);
    //   //   Object.defineProperty(HomePage.prototype, 'innerHMTL', {
    //   //     value: spec.methods[method](),
    //   //     writable: true,
    //   //     configurable: true,
    //   //     enumerable: true
    //   //   });
    //   //   // HomePage.prototype.innerHTML = spec.methods[method]();
    //   // }

      // console.log('method', method);
      Component.methods[method].bind(Result.prototype);
     //  Result.prototype[method] = Component.methods[method];

    });
    console.log('Result', Result);
    const componentName = toKebabCase(Component.name);
    customElements.define(componentName, Result);
    const el = document.createElement(componentName);
    console.log('el', el);
    parent.appendChild(el);
  }


  
  // component.init();
}