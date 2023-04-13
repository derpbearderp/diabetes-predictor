import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"



// Age,Gender,Polyuria,Polydipsia,sudden weight loss,weakness,Polyphagia,Genital thrush,visual blurring,Itching,Irritability,delayed healing,partial paresis,muscle stiffness,Alopecia,Obesity
const csvFile = "data/diabetes_data_upload.csv"
const trainingLabel = "class"
const ignored = ["class", "Obesity", "Polyuria", "sudden weight loss", "weakness", "Polyphagia", "visual blurring" ]
const acc = document.getElementById("acc");
const truetrue = document.getElementById("1");
const truefalse = document.getElementById("2");
const falsefalse = document.getElementById("3");
const falsetrue = document.getElementById("4");



function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => trainModel(results.data)   
    })
}



function trainModel(data) {


    data.sort(() => (Math.random() - 0.5))

    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)



    let decisionTree = new DecisionTree({
        ignoredAttributes: ignored,
        trainingSet: trainData,
        categoryAttr: trainingLabel,
        maxTreeDepth: 40
    })


    let visual = new VegaTree('#view', 800, 400, decisionTree.toJSON())


    
    let amountCorrect = 0;

    let predictedDiabetesWasDiabetes = 0;
    let predictedHealthyWasHealthy = 0;
    let predictedHealthyWasDiabetes = 0;
    let predictedDiabetesWasHealthy = 0;


    for (let row of testData) {
        let diabetesPrediction = decisionTree.predict(row)
        if (diabetesPrediction == row.class){
            amountCorrect ++ 
        } 
        

        if(diabetesPrediction == 1 && row.class == 1) {
            predictedDiabetesWasDiabetes++
        }

        if(diabetesPrediction == 0 && row.class == 1) {
            predictedHealthyWasDiabetes++
        }

        if(diabetesPrediction == 0 && row.class == 0) {
            predictedHealthyWasHealthy++
        }

        if(diabetesPrediction == 1 && row.class == 0) {
            predictedDiabetesWasHealthy++
        }
        
    }
    console.log(amountCorrect)
    let accuracy = amountCorrect / testData.length
    console.log(accuracy)
    acc.innerText =`accuracy: ${accuracy}`
    truetrue.innerText = `${predictedHealthyWasHealthy}`
    falsefalse.innerText = `${predictedDiabetesWasDiabetes}`
    truefalse.innerText = `${predictedHealthyWasDiabetes}`
    falsetrue.innerText = `${predictedDiabetesWasHealthy}`

    let json = decisionTree.stringify()
    console.log(json)   

}






loadData()



