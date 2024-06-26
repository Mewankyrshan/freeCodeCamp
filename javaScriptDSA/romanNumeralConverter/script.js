document.getElementById("converter-form").addEventListener("submit", function(event){
    event.preventDefault();
    const textInput = document.getElementById("number").value;
    handleCheckButton(textInput);
});

const handleCheckButton = (number) => {
    const result = document.getElementById("output");
    if(number === ""){
        result.innerText = "Please enter a valid number";
        return;
    }
    if(number < 1){
        result.innerText = "Please enter a number greater than or equal to 1";
        return;
    }
    if(number > 3999){
        result.innerText = "Please enter a number less than or equal to 3999";
        return;
    }
    const romanNumber = intToRoman(number);
    
    result.innerText = `${romanNumber}`;
};

function intToRoman(num) {
    const romanMap = [
        [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
        [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
        [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];

    let result = '';
    for (let [value, symbol] of romanMap) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }
    return result;
}
