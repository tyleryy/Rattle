


function calculateScore(newHist, prevHist, errorBound) {
    let score = 0;
    for (let i = 0; i < prevHist.length; i++) {
        console.log(`${newHist[i]} and ${prevHist[i]}`)
        if (newHist[i] == null) continue
        let diff = Math.abs(prevHist[i] - newHist[i])
        if (diff <= errorBound) {
            score += errorBound - diff + 1 // add plus one make edge of error bound add points to score
        }
        console.log("score: ", score)
    }
    return score
}

// happy path
let a = [1,0,11]
let b = [11,12,13]
let x = calculateScore(a, b, 10) // 4
console.log("score: ", x)
console.log("——————————————————————————————")

// null and different length
a = [1,null,3]
b = [11,12,13,14]
x = calculateScore(a, b, 10) // 2
console.log(x)
console.log("——————————————————————————————")

