import {useState} from "react";

export default function App() {
    const [verb,setVerb] = useState("");
    const [irregularity,setIrregularity] = useState("0");
    return (
        <main className="bg-slate-950 w-screen min-h-screen mx-auto flex flex-col items-center">
            <h1 className={"text-6xl text-white font-bold underline decoration-green-700 decoration-6 mt-10"}>Conjugación de verbos:</h1>
            <div>
                <input onChange={e => setVerb(e.target.value)}
                       className="hover:scale-105 pl-2 bg-slate-900 mr-20 mt-20 h-16 w-80 text-white text-4xl focus:ring-8 focus:ring-green-700 transition-all duration-300 focus:rounded-xl"
                       placeholder="Czasownik..." type="text"/>
                <select onChange={e => setIrregularity(e.target.value)} className="hover:scale-105 pl-2 bg-slate-900 h-16 text-white mt-20 w-40 text-3xl focus:ring-8 focus:ring-green-700 transition-all duration-300 focus:rounded-xl">
                    <option value="0">regularny</option>
                    <option value="1">E&gt;IE</option>
                    <option value="2">O&gt;UE</option>
                    <option value="3">E&gt;I</option>
                    <option value="4">U&gt;UE</option>
                </select>
            </div>

            <WordList verb={verb} irregularity={irregularity}/>

        </main>
    )
}

function WordList(props) {
    const bodyOfVerb = props.verb.split("").reverse().slice(2).reverse().join("");
    let bodyOfVerb2;
    const typeOfVerb = props.verb.split("").reverse()[1];
    const typeOfVerb2 = typeOfVerb == "a" ? "a" : "e";
    let typeOfVerb3;
    switch(typeOfVerb){
        case "a" : typeOfVerb3 = "á"; break;
        case "e" : typeOfVerb3 = "é"; break;
        case "i" : typeOfVerb3 = "í"; break;
    }
    console.log(bodyOfVerb);
    switch(props.irregularity){
        case "0": bodyOfVerb2=bodyOfVerb;
        case "1": bodyOfVerb2=bodyOfVerb.replace("e","ie"); break;
        case "2": bodyOfVerb2=bodyOfVerb.replace("o","ue"); break;
        case "3": bodyOfVerb2=bodyOfVerb.replace("e","i"); break;
        case "4": bodyOfVerb2=bodyOfVerb.replace("u","ue"); break;
    }


    if (props.verb.length < 2) {
        return <div></div>;
    }


    return (
        <div className={"border-green-700 border-4 rounded-3xl m-20 grid grid-cols-2 gap-16 p-9 relative transition-all duration-300"}>
            <HiddenLine/>
            <Word text="yo" label={bodyOfVerb2+"o"}/>
            <Word text="nosotros" label={bodyOfVerb + typeOfVerb + "mos"}/>
            <Word text="tu" label={bodyOfVerb2+typeOfVerb2+"s"}/>
            <Word text="vosotros" label={typeOfVerb3 == "í" ? bodyOfVerb + "ís": bodyOfVerb +typeOfVerb3 + "is"}/>
            <Word text="el/ella" label={bodyOfVerb2+typeOfVerb2}/>
            <Word text="ellos/ellas" label={bodyOfVerb2+typeOfVerb2+"n"}/>
        </div>
    )
}

function Word(props) {
    return (
        <div className={"transition-all duration-300 hover:bg-slate-800 hover:scale-105 text-white bg-slate-900 rounded-2xl w-60 h-20 text-4xl flex items-center justify-start p-4 group relative"}>
                <span className="absolute -left-6 bottom-11 p-3 m-3 rounded-md shadow-md text-white bg-slate-700 text-xl transition-all duration 100 origin-left scale-0  group-hover:scale-100">
                {props.text}
                </span>
            {props.label}
        </div>
    )
}

function HiddenLine() {
    return <div
        className={"absolute w-1/2 h-2/3 -top-1 -right-1 border border-green-700 border-4 rounded-bl-3xl rounded-tr-3xl"}></div>
}