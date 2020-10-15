export class SmartdomElement_{
    constructor(props){
        this.props = props

        this.e = document.createElement(this.props.tagName)
    }

    a(...childs){
        for(let child of childs){
            if(child instanceof SmartdomElement_){
                this.e.appendChild(child.e)
            }else{
                for(let childe of child){
                    this.e.appendChild(childe.e)
                }                
            }            
        }
        return this
    }

    ae(kind, callback){
        this.e.addEventListener(kind, callback)
        return this
    }

    sa(key, value){
        this.e.setAttribute(key, value)
        return this
    }

    addStyle(name, value){
        this.e.style[name] = value

        return this
    }

    disp(x){return this.addStyle("display", x)}
    fl(){return this.disp("flex")}
    fldir(x){return this.addStyle("flexDirection", x)}
    flrow(){return this.fldir("row")}
    flcol(){return this.fldir("column")}
    flexwr(x){return this.addStyle("flexWrap", x)}
    jc(x){return this.addStyle("justifyContent", x)}
    ai(x){return this.addStyle("alignItems", x)}
    w(x){return this.addStyle("width", x + "px")}
    h(x){return this.addStyle("height", x + "px")}
    t(x){return this.addStyle("top", x + "px")}
    l(x){return this.addStyle("left", x + "px")}
    c(x){return this.addStyle("color", x)}
    op(x){return this.addStyle("opacity", x)}
    ta(x){return this.addStyle("textAlign", x)}
    tac(){return this.ta("center")}
    ovf(x){return this.addStyle("overflow", x)}
    ovfs(){return this.ovf("scroll")}
    ovfx(x){return this.addStyle("overflowX", x)}
    ovfxs(){return this.ovfx("scroll")}
    ovfy(x){return this.addStyle("overflowY", x)}
    ovfys(){return this.ovfy("scroll")}
    bdr(x){return this.addStyle("border", x)}
    bdrw(x){return this.addStyle("borderWidth", x + "px")}
    bdrc(x){return this.addStyle("borderColor", x)}
    bdrr(x){return this.addStyle("borderRadius", x + "px")}
    bdrs(x){return this.addStyle("borderStyle", x)}
    boxs(x){return this.addStyle("boxShadow", x)}
    fw(x){return this.addStyle("fontWeight", x)}
    fwb(){return this.fw("bold")}
    fs(x){return this.addStyle("fontSize", x + "px")}
    fst(x){return this.addStyle("fontStyle", x)}
    fsti(){return this.fst("italic")}
    tdec(x){return this.addStyle("textDecoration", x)}    
    tdecu(){return this.tdec("underline")}
    bc(x){return this.addStyle("backgroundColor", x)}
    pad(x){return this.addStyle("padding", x + "px")}
    mar(x){return this.addStyle("margin", x + "px")}
    pos(x){return this.addStyle("position", x)}
    por(){return this.pos("relative")}
    poa(){return this.pos("absolute")}
    html(x){this.e.innerHTML = x;return this}
}

export class div_ extends SmartdomElement_{
    constructor(){
        super({tagName: "div"})
    }
}

export function div(){return new div_()}

export class table_ extends SmartdomElement_{
    constructor(){
        super({tagName: "table"})
    }
}

export function table(){return new table_()}

export class tr_ extends SmartdomElement_{
    constructor(){
        super({tagName: "tr"})
    }
}

export function tr(){return new tr_()}

export class td_ extends SmartdomElement_{
    constructor(){
        super({tagName: "td"})
    }
}

export function td(){return new td_()}

export class button_ extends SmartdomElement_{
    constructor(callback){
        super({tagName: "button"})
        this.ae("click", callback)
    }
}

export function button(callback){return new button_(callback)}

export class input_ extends SmartdomElement_{
    constructor(kind){
        super({tagName: "input"})
        this.sa("type", kind)
    }
}

export function input(kind){return new input_(kind)}
