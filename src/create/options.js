class ComponentOptions {
    constructor(options, name) {
        this.options = options
        this.name = name
    }

    addOptions(hideDelete) {
        let optionsDiv = document.getElementById("optionsDivSimu");
        let nameDiv = document.createElement("div");
        nameDiv.className = "nameDiv";
        nameDiv.innerHTML = this.name;
    

   
        optionsDiv.appendChild(nameDiv);
    
        let extraHeight = 0;
    
        for (let i = 0; i < this.options.length; i++) {
            let div = this.options[i].getDiv();
            extraHeight += this.options[i].height || 0;
            optionsDiv.appendChild(div);
        }
        optionsDiv.style = `height: ${20 + 20 * this.options.length + extraHeight + 10}px; visibility: visible`;
    }
    
    clone() {
        let newOpt = []
        for (let i = 0; i < this.options.length; i++) {
            newOpt.push(this.options[i].clone())
        }
        return new ComponentOptions(newOpt, this.name)
    }

}

class TextboxOption {
    constructor(name, value, id) {
        this.name = name
        this.value = value
        this.id = id
        this.idName = "txt"
    }

    getDiv() {
    
        let div = document.createElement("div")
        let textbox = document.createElement('input')
        textbox.className = "opt-txtbox"
        textbox.type = 'text'
        textbox.value = this.value
        textbox.id = "opt-txt-" + this.id
        textbox.autocomplete = "off"
        textbox.oninput = () => {
            this.value = this.getValue()
            drawnComp.update()
        }

        div.appendChild(document.createTextNode(this.name + " "));
        div.appendChild(textbox)

        
       return div
    }

    setValue(val) {
        this.value = val
    }

    getValue() {
        let opt = document.getElementById("opt-txt-" + this.id)
        if (opt)
            return document.getElementById("opt-txt-" + this.id).value
        return null
    }

    clone() {
        return new TextboxOption(this.name, this.value, this.id)
    }

}

class CheckboxOption {
    constructor(name, value, id) {
        this.name = name
        this.value = value
        this.id = id
        this.idName = "chk"
    }

    getDiv() {

        let div = document.createElement("div")
        let textbox = document.createElement('input')
        textbox.className = "opt-checkbox"
        textbox.type = 'checkbox'
        textbox.checked = this.value
        textbox.id = "opt-chk-" + this.id
        textbox.onchange = () => {
            this.value = this.getValue()
            drawnComp.update()
        }

        div.appendChild(document.createTextNode(this.name + " "));
        div.appendChild(textbox)
        
       return div

    }

    getValue() {
        return document.getElementById("opt-chk-" + this.id).checked
    }

    clone() {
        return new CheckboxOption(this.name, this.value, this.id)
    }

}

function clearOptions() {
    let div = document.getElementById("optionsDivSimu")
    div.innerHTML = ""
    div.style = "height: 0px; visibility: hidden"
}

class ImageSelectOption {
    constructor(name, value, buttons) {
        this.name = name
        this.value = value
        this.buttons = buttons
        this.height = 30
        this.idName = "img"
    }

    getDiv() {

        let div = document.createElement("div")
        div.appendChild(document.createTextNode(this.name + " "));

        this.buttons.forEach(b => {
            let btn = createImageButton(b[0])
            btn.onclick = () => {
                let rotation = this.value.rotation
                if (b[1].clone) 
                    this.value = b[1].clone()
                else
                    this.value = b[1]
                if (this.value.rotateTimes) this.value.rotateTimes(rotation)
                if (this.value.color) this.value.color = SELECTED_COLOR
                drawnComp.update()

            }
            div.appendChild(btn)
            
        });
        
       return div

    }
        
    getValue() {
        return this.value
    }

    clone() {
        return new ImageSelectOption(this.name, this.value.clone?this.value.clone():this.value, this.buttons)
    }

}