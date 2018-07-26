import React from 'react';
import countBy from 'lodash/countBy';
import toPairs from 'lodash/toPairs';
import './ZipfGraph.css';

function stripHtml(html){
    // Create a new div element
    const temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

const ZipfGraph = ({text}) => {

    const strippedText = stripHtml(text);
    console.log(strippedText.length);
    const sortedWords = strippedText.replace(" ","").length < 1 
        ? [] 
        : toPairs(
            countBy(
                strippedText.toLowerCase()
                            .replace(/\s+/g, " ")
                            .replace(/[^a-zA-Z0-9À-ž\s]/g,"")
                            .split(" ")
            )
        )
        .sort((a, b) => {return b[1] - a[1]});
    const maxCount = sortedWords.length > 0 ? sortedWords[0][1] : 0;
    const xIncrement = sortedWords.length > 0 ? Math.floor(1/sortedWords.length * 1000)/10 : 100;
    const innerWidth = sortedWords.length * 12;
    let gridlineVals = [];
    if(maxCount >= 10){
        for(let i = 0; i <= 10; i ++){
            const percent = i/10;
            gridlineVals.push({
                x: percent*100,
                value: Math.floor(percent * maxCount),
            });
        }
    } else if(maxCount > 0){
        for(let i = 0; i <= maxCount; i ++){
            const percent = i/maxCount;
            gridlineVals.push({
                x: percent*100,
                value: Math.floor(percent * maxCount),
            });
        }
    } else {
        gridlineVals = [
            {
                x: 0,
                value: 0
            }
        ];
    }
    return (
        <div className="ZipfGraph">
            <div className="ZipfGraph__inner" style={{width: `${innerWidth}px`}}>
                {gridlineVals.map((val)=>{
                    return(
                        <div className="ZipfGraph__inner__gridline" style={{bottom: `${val.x}%`}}>
                            <div className="ZipfGraph__inner__gridline__label">{val.value}</div>
                        </div>
                    );
                })}
                {
                    sortedWords.map((pair, i)=>{
                        const y = Math.round(pair[1] / maxCount * 1000)/10;
                        return (
                            <div className="ZipfGraph__bar" style={{bottom: `calc(${y}% - 5px)`, left: xIncrement*i + "%"}} key={i}>
                                <div className="ZipfGraph__label">
                                    {pair[0]}
                                </div>
                                <div className="ZipfGraph__label__hover">
                                    {pair[0]}:<span>{pair[1]}</span>
                                </div>
                            </div>
                        );
                    })
                }
                {
                    sortedWords.map((pair, i)=>{
                        const y = Math.round((1/(i+1)) * 1000)/10;
                        return (
                            <div className="ZipfGraph__bar ZipfGraph__bar--expected" style={{bottom: `calc(${y}% - 5px)`, left: xIncrement*i + "%"}} key={i} />
                         );
                    })
                }      
            </div>
            
        </div>
    );
}

export default ZipfGraph;