const scrollSize = 17

function htmlify(content){
    for(let prot of ["https://", "http://"]){
        let m
        if(m = content.match(new RegExp(prot + `[^\\s]+`))){            
            content = content.replace(m[0], `<a href="${m[0]}" rel="noopener noreferrer" target="_blank">${m[0]}</a>`)              }
    }
    return content
}

class Coords_{
    constructor(x, y){
        this.x = x
        this.y = y
    }

    add(coords){
        return Coords(this.x + coords.x, this.y + coords.y)
    }

    sub(coords){
        return Coords(this.x - coords.x, this.y - coords.y)
    }

    mult(scalar){
        return Coords(this.x * scalar, this.y * scalar)   
    }
}
function Coords(x, y){return new Coords_(x,y)}

class SmartdomElement_{
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

    storeItem(key, blob){
        let path = this.storePath()

        if(!path) return

        localStorage.setItem(path + "/" + key, JSON.stringify(blob))
    }

    state(key){
        let path = this.storePath()

        let blob = {}

        if(!path) return key ? null : blob

        let stored = localStorage.getItem(path + (key ? "/" + key : ""))

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
    jcsa(){return this.jc("space-around")}
    ai(x){return this.addStyle("alignItems", x)}
    aic(){return this.ai("center")}
    w(x){return this.addStyle("width", x + "px")}
    h(x){return this.addStyle("height", x + "px")}
    t(x){return this.addStyle("top", x + "px")}
    l(x){return this.addStyle("left", x + "px")}
    tl(coords){return this.t(coords.x).l(coords.y)}
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
    ff(x){return this.addStyle("fontFamily", x)}
    ffms(){return this.ff("monospace")}
}

class div_ extends SmartdomElement_{
    constructor(){
        super({tagName: "div"})
    }
}

function div(){return new div_()}

class table_ extends SmartdomElement_{
    constructor(){
        super({tagName: "table"})
    }
}

function table(){return new table_()}

class tr_ extends SmartdomElement_{
    constructor(){
        super({tagName: "tr"})
    }
}

function tr(){return new tr_()}

class td_ extends SmartdomElement_{
    constructor(){
        super({tagName: "td"})
    }
}

function td(){return new td_()}

class button_ extends SmartdomElement_{
    constructor(callback){
        super({tagName: "button"})
        this.ae("click", callback)
    }
}

function button(callback){return new button_(callback)}

class input_ extends SmartdomElement_{
    constructor(kind){
        super({tagName: "input"})
        this.sa("type", kind)
    }
}

function input(kind){return new input_(kind)}

class TextInput_ extends SmartdomElement_{
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

function TextInput(props){return new TextInput_(props)}

class CheckBox_ extends SmartdomElement_{
    constructor(props){
        super({...{tagName: "div"}, ...props})

        this.disp("inline-block").a(
            this.checkbox = input("checkbox").ae("input", this.checkboxChanged.bind(this))
        )

        let checked = this.props.checked

        if(typeof this.state().checked != "undefined"){
            checked = this.state().checked
        }

        if(this.props.forceChecked) checked = this.props.forceChecked

        this.setChecked(checked || false)
    }

    getChecked(){
        return this.checkbox.e.checked
    }

    setChecked(checked){
        this.checkbox.e.checked = checked

        return this
    }

    checkboxChanged(){
        this.store({
            checked: this.getChecked()
        })

        if(this.props.changedCallback){
            this.props.changedCallback(this.getChecked())
        }
    }
}

function CheckBox(props){return new CheckBox_(props)}

class Labeled_ extends SmartdomElement_{
    constructor(label, element){
        super({tagName: "div"})
        this.fl().bc("#eee").pad(1).aic().a(
            div().marl(3).marr(2).html(label),
            element
        )
    }
}

function Labeled(label, element){return new Labeled_(label, element)}

class Tab_ extends SmartdomElement_{
    constructor(caption, element){
        super({tagName: "div"})
        this.curp().dib().fl().bc("#ddd").pad(1).aic().a(
            this.captionDiv = div().marl(3).marr(2).html(caption)
        ).ae("click", this.clicked.bind(this))
        this.caption = caption
        this.element = element
    }

    clicked(){
        this.parentTabpane.containerDiv.x().a(this.element)

        try{
            this.element.resize(this.parentTabpane.width - scrollSize, this.parentTabpane.containerSize - scrollSize)
        }catch(err){}

        this.parentTabpane.tabs.forEach(tab => {
            if(tab == this){
                tab.bc("#ffa")
                tab.selected = true
                
                this.parentTabpane.storeItem("selectedCaption", tab.caption)
            }else{
                tab.bc("#ddd")
                tab.selected = false
            }
        })
    }
}

function Tab(caption, element){return new Tab_(caption, element)}

class Tabpane_ extends SmartdomElement_{
    constructor(props){
        super({...{tagName: "div"},...props})
        this.tabSize = this.props.tabSize || 40
        this.width = this.props.width || 600
        this.height = this.props.height || 400
        this.barColor = this.props.barColor || "#eee"

        this.fitWindow = this.props.fitWindow || false

        if(this.fitWindow) window.addEventListener("resize", this.resize.bind(this))

        this.tabs = []

        this.build()
    }

    resize(width, height){
        this.width = width
        this.height = height
        this.build()
    }

    storedSelectedTab(){
        let selectedTab = this.tabs.find(tab => tab.caption == this.state("selectedCaption"))
        return selectedTab || this.tabs[0]
    }

    setTabs(tabs){
        this.tabs = tabs
        tabs.forEach(tab => tab.parentTabpane = this)
        this.build()
        this.storedSelectedTab().clicked()
        return this
    }

    selectedTab(){
        return this.tabs.find(tab => tab.selected)
    }

    build(){        
        if(this.fitWindow){
            this.width = window.innerWidth - scrollSize
            this.height = window.innerHeight - scrollSize
        }
        this.x().w(this.width).h(this.height).bc("#aff").por()        
        this.tabDiv = div().fl().aic().jc("space-around").poa().w(this.width).h(this.tabSize).bc(this.barColor).t(0).l(0)
        this.containerSize = this.height - this.tabSize
        this.containerDiv = div().ovfs().poa().w(this.width).h(this.containerSize).t(this.tabSize).l(0)
        this.a(this.tabDiv, this.containerDiv)

        this.tabDiv.a(this.tabs)

        let selectedTab = this.selectedTab()

        if(selectedTab) selectedTab.clicked()
    }
}

function Tabpane(props){return new Tabpane_(props)}

class Section_ extends SmartdomElement_{
    constructor(props){
        super({...props, ...{tagName: "div"}})
        
        this.docs = props.docs || {}
        
        this.a(
            div().pad(10).fs(25).fwb().html(this.docs.title),
            this.docs.paragraphs.map(paragraph=>div().w(950)
                    .bdrs("solid").bdrw(1).bdrc("#aaa").bdrr(10)
                    .pad(3).addStyle("paddingLeft", "10px").mar(6).bc("#eee").html(htmlify(paragraph)))
        )
    }
}
function Section(props){return new Section_(props)}

class EnvVars_ extends SmartdomElement_{
    constructor(props){
        super({...props, ...{tagName: "div"}})
        
        this.docs = props.docs || {}
        
        for(let key in this.docs){
            let item = this.docs[key]
            let parts = item.split("|")
            this.docs[key] = {
                item: parts[0],
                example: (parts[1] || "")
            }
        }
        
        this.w(960).addStyle("boxShadow", "5px 5px #eee").pad(5).addStyle("paddingLeft", "10px").bc("#cdd").a(Object.entries(this.docs).map(entry=>div().w(950).fl().addStyle("marginTop", "3px").addStyle("marginBottom", "6px").addStyle("boxShadow", "5px 5px #abc").a(
            div().c("#007").fl().aic().addStyle("minWidth", "300px").pad(3).addStyle("paddingLeft", "10px").mar(1).bc("#eee").fwb().a(div().html(entry[0])),
            div().addStyle("width", "100%").pad(3).addStyle("paddingLeft", "10px").mar(1).bc("#ffe").c("#070").html(`${entry[1].item}<span style="color:#007;">${entry[1].example?" , example : ":""}</span><span style="color:#700;font-weight:bold;font-family:monospace;">${entry[1].example}</span>`)
        )))
    }
}
function EnvVars(props){return new EnvVars_(props)}

class Image_ extends SmartdomElement_{
    constructor(props){
        super({...props, ...{tagName: "img"}})          
    }
    
    load(url, onload){
        this.e.onload = onload
        this.e.src = url
        return this
    }
    
    setWidth(width){
        this.e.width = width
        return this
    }
    
    setHeight(height){
        this.e.height = height
        return this
    }
}
function Image(props){return new Image_(props)}

class select_ extends SmartdomElement_{
    constructor(props){
        super({...props, ...{tagName: "select"}})           
    }
}
function select(props){return new select_(props)}

class option_ extends SmartdomElement_{
    constructor(props){
        super({...props, ...{tagName: "option"}})           
        this.value = props.value || "?"
        this.html(props.display || props.value || "?")
    }
}
function option(props){return new option_(props)}

class Combo_ extends SmartdomElement_{
    constructor(props){
        super({...props, ...{tagName: "div"}})          

        this.disp("inline-block")

        this.select = select()

        this.options = props.options || []

        let selected = this.props.selected

        if(typeof this.state().selected != "undefined"){
            selected = this.state().selected
        }

        if(this.props.forceSelected) selected = this.props.forceSelected

        this.setSelected(selected || null)

        this.a(this.select)
        this.select.ae("change", this.selectChanged.bind(this))
    }
    
    buildOptions(){
        this.select.x()

        for(let opt of this.options){
            let opte = option(opt)              
            if(opt.value == this.selected) opte.e.setAttribute("selected", true)
            this.select.a(
                opte
            )
        }
    }

    getSelected(){
        return this.select.e.value
    }

    setSelected(value){
        this.selectOption(value)
    }
    
    selectChanged(){
        if(this.props.selectChangedCallback){
            this.props.selectChangedCallback(this.getSelected())
        }

        this.store({
            selected: this.getSelected()
        })
    }
    
    selectOption(value){
        this.selected = value
        this.buildOptions()
    }
}
function Combo(props){return new Combo_(props)}

class MultipleSelect_ extends SmartdomElement_{    
    // selectedKeys is an array of checkbox ids
    setSelectedKeys(selectedKeys){
        this.x().a(this.options.map(option =>
            Labeled(option[1], this.checkBoxes[option[0]] = 
                CheckBox({id: option[0], changedCallback: checked => {
                    this.store({
                        selectedKeys: this.getSelectedKeys()
                    })
                }})
                .setChecked(selectedKeys.includes(option[0]))
            )
        ))

        this.store({
            selectedKeys: selectedKeys
        })
    }

    getSelectedKeys(){
        return Object.entries(this.checkBoxes).filter(entry => entry[1].getChecked()).map(entry => entry[0])
    }
    
    constructor(props){
        super({...props, ...{tagName: "div"}})           
        
        this.options = props.options

        let selectedKeys = this.props.selectedKeys

        if(typeof this.state().selectedKeys != "undefined"){
            selectedKeys = this.state().selectedKeys
        }

        if(this.props.forceSelectedKeys) selectedKeys = this.props.forceSelectedKeys
        
        this.checkBoxes = {}
        
        this.pad(1).bc("#aaa").fl()
        
        this.setSelectedKeys(selectedKeys || [])
    }
}
function MultipleSelect(props){return new MultipleSelect_(props)}

class hr_ extends SmartdomElement_{
    constructor(){
        super({tagName: "hr"})
    }
}
function hr(){return new hr_()}

const testApp =
    Tabpane({id:"main",fitWindow:true}).setTabs([
        Tab("xxx", Tabpane({id:"sub",barColor:"#eff"}).setTabs([
            Tab("xxx", div().html("xxx")),
            Tab("yyy", div().html("yyy"))
        ])),
        Tab("yyy", div().html("yyy"))
    ])
