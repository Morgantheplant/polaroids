import glfx from "glfx";
import { elementBuilder } from "./elementBuilder";
import { outCubic, inCubic, inExpo, outQuint } from "./Easings";
import { transitionBuilder } from "./transitionBuilder";

export class RecordPlayer {
  constructor({ loop }) {
    this.loop = loop;

    //this._addListeners = this._addListeners.bind(this);
   

    this.record = elementBuilder("img", {
      className: "record spin",
      src: "/assets/images/record.png"
    });

    this.player = elementBuilder("img", {
      src: "/assets/images/lp.jpg",
      className: "record-player"
    });

    

    this.el = elementBuilder("div", {
      className: "image-bg-record",
      childNodes: [this.player, this.record]
    });

    //this._addListeners();
    return this;
  }
  _addListeners() {
    //this.image.addEventListener("load", this._initImageCanvas);
  }
 
}
