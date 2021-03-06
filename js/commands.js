let func = require("./functions");



// loading data with Promise
var dStore = {}
require("./dataStore.js").then((x)=>{
    dStore = x.val();
    dStore['files'] = Object.keys(dStore['Info']).map( x => x.replace("_","."));
});


let commands = {
        "ls":(x)=>{
        if(x.replace(/  */,"")==="ls"){
            //func.displayOutput(dStore.files.join(" "));
            let mainP = document.createElement("P");
            let files = Object.keys(func.getContext(dStore['Info'])).map( x => x.replace("_","."));
            for(var k=0; k<files.length; k++){
                var elem = document.createElement("SPAN");
                if(files[k].slice(-4)!=".txt"){
                    elem.setAttribute("class","dir");
                }
                
                // append nodes / set attr
                elem.innerHTML = " " + files[k] + " ";
                mainP.appendChild(elem);
            }
            
            // remove old bash
            func.removeOldBash();
            
            // create new bash
            let bash = func.createNewBash();
            
            let term = document.getElementById("terminal");
            term.appendChild(mainP);
            term.appendChild(bash);
            
        }else{
            func.errorMessage(x);
        }

    },
    "clear":(x)=>{
        if(x.replace(/  */,"")==="clear"){
        let terminal = document.getElementById("terminal");
        let bash = document.getElementById("bash");
        terminal.innerHTML = "";
        terminal.appendChild(bash);
        document.getElementById("input").innerHTML = "";
        }else{
            func.errorMessage(x);
        }
    },
    "cat":(x)=>{
        let info = x.replace("cat ","").replace(".","_");
        //let files = Object.keys(func.getContext(dStore["Info"])).map(x => x.replace("_","."));
        let files = func.getContext(dStore["Info"]);
        if(files.hasOwnProperty(info)){
            func.displayOutput(files[info]);
        }else{
            func.errorMessage("No such file or directory");
        }
        //func.displayOutput(files);
    },
    "cd":(x)=>{
        if(x.slice(-4)===".txt"){
            func.displayOutput("Not a directory");
        }else{
            let dir = x.replace("cd ","");
            // update path variable
            if(dir===".."){
                path = path.replace(`/${current_dir}`,"");
                current_dir = path.split("/").pop();
            }
            else{
                path = (path != "/" ? path : "") + `/${dir}`;
                current_dir = dir;
            }
            func.displayOutput(" ");
            
        }
    },
    "pwd":(x) => {
            func.displayOutput(func.printPath());  
    },
    "echo":(x)=>{
        let data = x.replace("echo ","");
        func.displayOutput(data);
    },
    "help":(x)=>{
        if(x.replace(/  */,"")==="help"){
        let commandList = Object.keys(commands);
        let data = "Try these commands to find out more about me: ";
        for(let i=0;i<commandList.length;i++){
            data += commandList[i] + ", "
        }
        func.displayOutput(data.slice(0,data.length-2));
        }else{
            func.errorMessage(x);
        }
    }

}



module.exports = {
    commands: commands
}
