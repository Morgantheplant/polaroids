import glfx from "glfx";
import { elementBuilder } from "./elementBuilder";
import { outCubic, inCubic, inExpo, outQuint } from "./Easings";
import { transitionBuilder } from "./transitionBuilder";

const checkVisibleY = (el) => {
  var rect = el.getBoundingClientRect();
  var viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};

const checkVisibleX = (el, width)=> {
  var rect = el.getBoundingClientRect();
  var viewWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth
  );
  return !(rect.right < 0 || rect.left - viewWidth >= 0);
};

const STATE = {
  ON: "ON",
  OFF: "OFF",
  TRANSITION: "TRANSITION"
};

const SHOW_IMAGE = "SHOW_IMAGE";
const HIDE_IMAGE = "HIDE_IMAGE";
const DONE_SHOW = "DONE_SHOW";
const DONE_HIDE = "DONE_HIDE";

const stateMachine = {
  [STATE.ON]: {
    [HIDE_IMAGE]: STATE.TRANSITION
  },
  [STATE.TRANSITION]: {
    [DONE_HIDE]: STATE.OFF,
    [DONE_SHOW]: STATE.ON
  },
  [STATE.OFF]: {
    [SHOW_IMAGE]: STATE.TRANSITION
  }
};

export class Polaroid {
  constructor({ srcs, loop }) {
    this.loop = loop;
    this.currentState = STATE.OFF;
    this.stateMachine = stateMachine;
    this._addListeners = this._addListeners.bind(this);
    this.initImageCanvas = this.initImageCanvas.bind(this);
    this.checkVisibility = this.checkVisibility.bind(this);
    this.hideImage = this.hideImage.bind(this);
    this.showImage = this.showImage.bind(this);
    this.transitional = this.transitional.bind(this);
    this.tween = this.tween.bind(this);
    
    this.images = srcs.map(src=> elementBuilder("img", {
      className: "image-item",
      src
    }))

    this.bgImg = elementBuilder("img", {
      src: "/assets/images/polaroid.png",
      className: "polaroid-frame"
    });

    this.fadeIn = elementBuilder("div", {
      className: "fade-in"
    });

    this.el = elementBuilder("div", {
      className: "image-wrap",
      childNodes: [this.bgImg, ...this.images, this.fadeIn]
    });

    this._addListeners();
    return this;
  }
  _addListeners() {
    this.images[0].addEventListener("load", this.initImageCanvas);
  }
  initImageCanvas() {
    try {
      this.canvas = glfx.canvas();
      this.canvas.className = "image-item";
    } catch (e) {
      this.fadeIn.style.opacity = 0;
      return this.images[0];
    }
    const image = this.images[0];
    this.images.forEach(image=>{
      image.style.opacity = 0;
    })

    // image.parentNode.insertBefore(this.canvas, image);
    // this.loadImage();
    //const image = this.images[index];
    this.texture = this.canvas.texture(image);
    image.parentNode.insertBefore(this.canvas, image);
    //image.parentNode.removeChild(image);
    //this.canvas = canvas;
  }
  loadImage(){
    const index = Math.floor(Math.random()*this.images.length)
    const image = this.images[index];
    this.texture.loadContentsOf(image);
    
    // image.parentNode.removeChild(image);
    // this.canvas = canvas;
  }
  showImage(params) {
    this.loop.start();
    // transform value from 1 to 0
    const transform = inter => (inter <= 1 ? 1 - inter : 0);
    this.tween(transform, 2000, this.dispatchAction.bind(this, DONE_SHOW));
  }
  hideImage() {
    // transform value from 0 to 1
    const transform = inter => (inter >= 1 ? 1 : inter);
    this.tween(transform, 2000, ()=>{
      this.loadImage();
      this.dispatchAction(DONE_HIDE)
    });
  }
  transitional(...args) {
    return transitionBuilder(0, 60, this.loop)(...args);
  }
  dispatchAction(action, cb){
    const nextState = this.stateMachine[this.currentState][action];
    if(nextState){
      this.currentState = nextState;
      cb && cb();
    }
  }
  checkVisibility() {
    if (checkVisibleY(this.bgImg) && checkVisibleX(this.bgImg)) {
      this.dispatchAction(SHOW_IMAGE, this.showImage);
    } else {
      this.dispatchAction(HIDE_IMAGE, this.hideImage);
    }
  }

  tween(action, duration, done) {
      const value = 1;
      this.transitional({
        animation: inter => {
          const tween = action(inter);
          this.canvas
            .draw(this.texture)
            .lensBlur(20 * tween, value * tween, 0)
            .update();
          this.fadeIn.style.opacity = tween;
        },
        duration,
        easing: inCubic,
        delay: 100,
        done
      });
  }
}