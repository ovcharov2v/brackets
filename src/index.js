module.exports = function check(str, bracketsConfig) {
    let openingBrackets = [], // ({[
        closingBrackets = [], // )}]
        singleBrackets = []; // |

    bracketsConfig.forEach((arr) => {
        if (arr[0] == arr[1]) singleBrackets.push(arr[0]);
        else {
            openingBrackets.push(arr[0]);
            closingBrackets.push(arr[1])
        }
    })

    let stack = [];
    const result = str.split('').every((bracket) => {
        if (stack.length == 0 && closingBrackets.includes(bracket)) return false; // Closing bracket and empty stack => false
        // Single brackets
        if (singleBrackets.includes(bracket)) {
            (bracket == stack[stack.length - 1]) ? stack.pop(): stack.push(bracket);
        } else {
            // Pair brackets
            if (openingBrackets.includes(bracket)) stack.push(bracket);
            if (closingBrackets.includes(bracket)) {
                if (openingBrackets.indexOf(stack[stack.length - 1]) == closingBrackets.indexOf(bracket)) stack.pop();
            }
        }
        return true;
    })
    return result && stack.length == 0;
}
