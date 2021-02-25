
class Sketch {
  constructor() {
    
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.app = new PIXI.Application({
      backgroundColor: 0x1099bb, 
      resolution: window.devicePixelRatio || 1,
      resizeTo: window
    });
    document.body.appendChild(this.app.view);
    
    this.container = new PIXI.Container();
    
    this.app.stage.addChild(this.container);

    this.render()
  }

  render() {
    this.app.ticker.add( (delta) => {
      // console.log(delta)
    })
  }

}

new Sketch()