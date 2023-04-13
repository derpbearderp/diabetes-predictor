import { DecisionTree } from "./libraries/decisiontree.js"

const predic = document.getElementById("predic");
const labelOneBtn = document.querySelector("#prediction");
labelOneBtn.addEventListener("click", () => loadSavedModel());

function loadSavedModel() {
    fetch("model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded(model))
}
//1 is Male and Yes, 0 is Female and No, capital important
function modelLoaded(model) {
    let decisionTree = new DecisionTree(model)
    let Age = document.getElementById('Age').value
    let Gender = document.getElementById('Gender').value
    let Polydipsia = document.getElementById('Polydipsia').value
    let Genitalthrush = document.getElementById('Genitalthrush').value
    let Itching = document.getElementById('Itching').value
    let Irritability = document.getElementById('Irritability').value
    let delayedhealing = document.getElementById('delayedhealing').value
    let partialparesis = document.getElementById('partialparesis').value
    let musclestiffness = document.getElementById('musclestiffness').value
    let Alopecia = document.getElementById('Alopecia').value
    if (Age != ""  && Gender != "" && Polydipsia != "" && Genitalthrush != "" && Itching != "" && Irritability != "" && delayedhealing != "" && partialparesis != "" && musclestiffness != "" && Alopecia != ""){
    
    
    let diabetes = { Age: parseInt(Age) ,Gender: parseInt(Gender) ,Polydipsia: parseInt(Polydipsia) ,Genitalthrush: parseInt(Genitalthrush) ,Itching: parseInt(Itching) ,Irritability: parseInt(Irritability) ,delayedhealing: parseInt(delayedhealing) ,partialparesis: parseInt(partialparesis) ,musclestiffness: parseInt(musclestiffness) ,Alopecia: parseInt(Alopecia) }
    console.log(diabetes)
    console.log(decisionTree.predict)

    let prediction = decisionTree.predict(diabetes)
    

    console.log("predicted " + prediction)

    if (prediction == 0){
        predic.innerText =`According to our data it seems unlikely that you are suffering from diabetes`
    } else {
        predic.innerText =`Based on our data it's more likely than not that you could have an early form of diabetes, we'd reccomend you to seek out a local doctor for a more thorough diagnosis.`
    }} else {
        predic.innerText =`Insufficient data, please make sure all the fields are filled out with the requested data.`
    }
    
}

