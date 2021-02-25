

class Sketch {
  constructor() {

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.time = 1;

    this.app = new PIXI.Application({
      backgroundColor: 0xfac0ae,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window
    });
    document.body.appendChild(this.app.view);
    
    this.container = new PIXI.Container();
    this.containerSpiral = new PIXI.Container();
    
    this.app.stage.addChild(this.container);
    this.app.stage.addChild(this.containerSpiral);

    this.phi = 0.5 + Math.sqrt(5)/2;
    console.log(this.phi)
    this.center = 0.7237;

    this.preloadAssets();

    console.log(this.app.renderer.width)
  }

  preloadAssets() {

    this.app.loader.baseUrl = "img";
    this.app.loader.add('river', 'river.png');
    this.app.loader.add('city', 'city.png');

    this.app.loader.onComplete.add(() => {
      this.add();
      this.addStuff();
      this.addLines();
      this.render();
    });

    this.app.loader.onError.add((e) => {
      console.log(e)
    });

    this.app.loader.load();
  }

  getRiver() {
    let river = new PIXI.Sprite.from(this.app.loader.resources['river'].texture);
    river.width = 500;
    river.height = 500;
    return river;
  }

  getCity() {
    let city = new PIXI.Sprite.from(this.app.loader.resources['city'].texture);
    city.width = 500;
    city.height = 500;
    return city;
  }

  addLines() {
    this.ctx = new PIXI.Graphics();
    this.ctx.lineStyle(2, 0xff0000, 0.5)

    let lastRight = this.width;
    let lastBottom = lastRight / this.phi;
    let tempHorizontal, tempVertical;

    this.ctx.moveTo(0, lastBottom);
    this.ctx.lineTo(lastRight, lastBottom);
    this.ctx.moveTo(lastRight, lastBottom);
    this.ctx.arc(lastRight, lastBottom, lastRight, 0.5 * Math.PI, Math.PI);

    let lastLeft = lastRight / this.phi;
    this.ctx.moveTo(lastLeft, 0);
    this.ctx.lineTo(lastLeft, lastBottom);
    this.ctx.moveTo(lastLeft, lastBottom);
    this.ctx.arc(lastLeft, lastBottom, lastLeft, Math.PI, 1.5 * Math.PI);

    let lastTop = lastBottom / this.phi;
    this.ctx.moveTo(lastLeft, lastTop);
    this.ctx.lineTo(lastRight, lastTop);
    this.ctx.moveTo(lastLeft, lastTop);
    this.ctx.arc(lastLeft, lastTop, lastTop, 1.5 * Math.PI, 0);

    lastRight = lastRight - (lastRight-lastLeft)/this.phi;
    this.ctx.moveTo(lastRight, lastTop);
    this.ctx.lineTo(lastRight, lastBottom);
    this.ctx.moveTo(lastRight, lastTop);
    this.ctx.arc(lastRight, lastTop, lastBottom - lastTop, 0, .5 * Math.PI);

    tempVertical = lastBottom - (lastBottom-lastTop)/this.phi;
    this.ctx.moveTo(lastLeft, tempVertical);
    this.ctx.lineTo(lastRight, tempVertical);
    this.ctx.moveTo(lastRight, tempVertical);
    this.ctx.arc(lastRight, tempVertical, lastBottom - tempVertical, .5 * Math.PI, Math.PI);

    lastBottom = tempVertical;
    tempHorizontal = lastLeft + (lastRight-lastLeft)/this.phi;
    this.ctx.moveTo(tempHorizontal, lastTop);
    this.ctx.lineTo(tempHorizontal, lastBottom);
    this.ctx.moveTo(tempHorizontal, lastBottom);
    this.ctx.arc(tempHorizontal, lastBottom, tempHorizontal - lastLeft, Math.PI, 1.5 * Math.PI);

    lastLeft = tempHorizontal;
    tempVertical = lastTop + (lastBottom-lastTop)/this.phi;
    this.ctx.moveTo(lastLeft, tempVertical);
    this.ctx.lineTo(lastRight, tempVertical);
    this.ctx.moveTo(lastLeft, tempVertical);
    this.ctx.arc(lastLeft, tempVertical, lastRight - lastLeft, 1.5 * Math.PI, 0);

    lastTop = tempVertical;
    tempHorizontal = lastRight - (lastRight-lastLeft)/this.phi;
    this.ctx.moveTo(tempHorizontal, lastTop);
    this.ctx.lineTo(tempHorizontal, lastBottom);
    this.ctx.moveTo(tempHorizontal, lastTop);
    this.ctx.arc(tempHorizontal, lastTop, lastRight - tempHorizontal, 0, .5 * Math.PI);

    lastRight = tempHorizontal;
    tempVertical = lastBottom - (lastBottom-lastTop)/this.phi;
    this.ctx.moveTo(lastLeft, tempVertical);
    this.ctx.lineTo(lastRight, tempVertical);
    this.ctx.moveTo(lastRight, tempVertical);
    this.ctx.arc(lastRight, tempVertical, lastRight - lastLeft, .5 * Math.PI, Math.PI);

    lastBottom = tempVertical;
    tempHorizontal = lastLeft + (lastRight-lastLeft)/this.phi;
    this.ctx.moveTo(tempHorizontal, lastTop);
    this.ctx.lineTo(tempHorizontal, lastBottom);
    this.ctx.moveTo(tempHorizontal, lastBottom);
    this.ctx.arc(tempHorizontal, lastBottom, tempHorizontal - lastLeft, Math.PI, 1.5 * Math.PI);

    lastLeft = tempHorizontal;
    tempVertical = lastTop + (lastBottom - lastTop)/this.phi;
    this.ctx.moveTo(lastRight, tempVertical);
    this.ctx.lineTo(lastLeft, tempVertical);
    this.ctx.moveTo(lastLeft, tempVertical);
    this.ctx.arc(lastLeft, tempVertical, lastRight - lastLeft, 1.5 * Math.PI, 0);

    this.containerSpiral.addChild(this.ctx)

  }

  getBlock() {
    let block = new PIXI.Sprite(PIXI.Texture.WHITE);
    block.tint = 0xff0000*Math.random();
    block.alpha = 0.5;
    block.width = 10;
    block.height = 10;
    return block;
  }

  addStuff() {
    this.centerX = this.width*this.center;
    this.centerY = this.width*this.center/this.phi;

    this.container.pivot.set(this.centerX, this.centerY);
    this.container.position.set(this.centerX, this.centerY);

    let block = new PIXI.Sprite(PIXI.Texture.WHITE);
    block.tint = 0xff0000;
    block.width = 10;
    block.height = 10;
    block.position.set(this.centerX, this.centerY);
    this.container.addChild(block);

    for(let i=-100; i<2000; i++) {
      let containerRiver = new PIXI.Container();
      let containerCity = new PIXI.Container();
      let angle = i * Math.PI/2;
      let scale = Math.pow(1/this.phi,i);

      let bl = this.getRiver();
      bl.width = this.width/this.phi;
      bl.height = this.width/this.phi;

      let cityBl = this.getCity();
      cityBl.width = this.width/this.phi;
      cityBl.height = this.width/this.phi;


      bl.position.set(-this.centerX, -this.centerY);
      cityBl.position.set(-this.centerX, -this.centerY);

      containerRiver.rotation = angle;
      containerRiver.scale.set(scale*0.75);
      containerRiver.position.set(this.centerX, this.centerY);

      containerCity.rotation = angle;
      containerCity.scale.set(scale);
      containerCity.position.set(this.centerX, this.centerY);

      containerRiver.addChild(bl)
      containerCity.addChild(cityBl)

      this.container.addChild(containerCity);
      this.container.addChild(containerRiver);
    }
  }

  add() {
    // let river = this.getRiver();
    // this.containerSpiral.addChild(river);
  }

  render() {
    this.app.ticker.add( (delta) => {
      this.time += 0.01;
      this.container.rotation = this.time;
      this.container.scale.set(Math.pow(1/this.phi, this.time/(Math.PI/2)))
    })
  }

}

new Sketch()