export class ViewBase {
  constructor(config={}){
    this.config = config;
    this.el = null;
  }
  mount(selector){
    if(typeof selector==='string'){
      this.el = document.querySelector(selector);
    }else{
      this.el = selector;
    }
    if(!this.el){
      console.warn('mount target not found:', selector);
      return;
    }
    this.render();
    this.onMount && this.onMount();
  }
  render(){
    if(!this.el){ return; }
    this.el.innerHTML = '<div></div>';
  }
}
