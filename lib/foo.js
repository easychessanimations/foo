export class SmartdomElement_{
    constructor(props){
        this.props = props || {}
 
        this.e = document.createElement(this.props.tagName)

        this.id = this.props.id || null

        this.parent = null

        this.childs = []
    }

    x(){
        this.e.innerHTML = ""
        return this
    }

    storePath(){
        if(!this.id) return null

        return this.id
    }

    store(blob){
        let path = this.storePath()

        if(!path) return

        localStorage.setItem(path, JSON.stringify(blob))
    }

    state(){
        let path = this.storePath()

        let blob = {}

        if(!path) return blob

        let stored = localStorage.getItem(path)

        if(!stored) return blob

        try{
            blob = JSON.parse(stored)
        }catch(err){}

        return blob
    }

    appendChild(child){
        this.childs.push(child)

        child.parent = this

        this.e.appendChild(child.e)
    }

    a(...childs){
        for(let child of childs){
            if(child instanceof SmartdomElement_){
                this.appendChild(child)
            }else{
                for(let childe of child){
                    this.appendChild(childe)
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
    dib(){return this.disp("inline-box")}
    fl(){return this.disp("flex")}    
    fldir(x){return this.addStyle("flexDirection", x)}
    flrow(){return this.fldir("row")}
    flcol(){return this.fldir("column")}
    flexwr(x){return this.addStyle("flexWrap", x)}
    jc(x){return this.addStyle("justifyContent", x)}
    ai(x){return this.addStyle("alignItems", x)}
    aic(){return this.ai("center")}
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
    marl(x){return this.addStyle("marginLeft", x + "px")}
    marr(x){return this.addStyle("marginRight", x + "px")}
    pos(x){return this.addStyle("position", x)}
    por(){return this.pos("relative")}
    poa(){return this.pos("absolute")}
    html(x){this.e.innerHTML = x;return this}
    cursor(x){return this.addStyle("cursor", x)}
    curp(){return this.cursor("pointer")}
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

export class TextInput_ extends SmartdomElement_{
    constructor(props){
        super({...{tagName: "div"}, ...props})
        this.disp("inline-block").a(
            this.text = input("text").ae("input", this.textChanged.bind(this))
        )

        this.text.e.value = this.state().value || ""
    }

    textChanged(){
        this.store({
            value: this.text.e.value
        })
    }
}

export function TextInput(props){return new TextInput_(props)}

export class CheckBox_ extends SmartdomElement_{
    constructor(props){
        super({...{tagName: "div"}, ...props})
        this.disp("inline-block").a(
            this.checkbox = input("checkbox").ae("input", this.checkboxChanged.bind(this))
        )

        this.checkbox.e.checked = this.state().checked || false
    }

    checkboxChanged(){
        this.store({
            checked: this.checkbox.e.checked
        })
    }
}

export function CheckBox(props){return new CheckBox_(props)}

export class Labeled_ extends SmartdomElement_{
    constructor(label, element){
        super({tagName: "div"})
        this.fl().bc("#eee").pad(1).aic().a(
            div().marl(3).marr(2).html(label),
            element
        )
    }
}

export function Labeled(label, element){return new Labeled_(label, element)}

export class Tab_ extends SmartdomElement_{
    constructor(caption, element){
        super({tagName: "div"})
        this.curp().dib().fl().bc("#ddd").pad(1).aic().a(
            this.captionDiv = div().marl(3).marr(2).html(caption)
        ).ae("click", this.clicked.bind(this))
        this.element = element
    }

    clicked(){
        this.parentTabpane.containerDiv.x().a(this.element)

        this.parentTabpane.tabs.forEach(tab => {
            if(tab == this){
                tab.bc("#ffa")
            }else{
                tab.bc("#ddd")
            }
        })
    }
}

export function Tab(caption, element){return new Tab_(caption, element)}

export class Tabpane_ extends SmartdomElement_{
    constructor(props){
        super({tagName: "div"})
        this.tabSize = this.props.tabSize || 40
        this.width = this.props.width || 600
        this.height = this.props.height || 400

        this.tabs = []

        this.build()
    }

    setTabs(tabs){
        this.tabs = tabs
        tabs.forEach(tab => tab.parentTabpane = this)
        this.build()
        this.tabs[0].clicked()
        return this
    }

    build(){
        this.w(this.width).h(this.height).bc("#aff").por()        
        this.tabDiv = div().fl().aic().jc("space-around").poa().w(this.width).h(this.tabSize).bc("#eee").t(0).l(0)
        this.containerSize = this.height - this.tabSize
        this.containerDiv = div().ovfs().poa().w(this.width).h(this.containerSize).t(this.tabSize).l(0)
        this.a(this.tabDiv, this.containerDiv)

        this.tabDiv.a(this.tabs)
    }
}

export function Tabpane(props){return new Tabpane_(props)}

export const testApp =
    Tabpane().setTabs([
        Tab("xxx", div().html("xxx")),
        Tab("yyy", div().html("yyy"))
    ])
