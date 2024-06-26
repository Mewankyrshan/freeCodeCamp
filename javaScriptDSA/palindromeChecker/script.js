document.getElementById("palindrome-form").addEventListener("submit", function(event){
    event.preventDefault();
    const textInput = document.getElementById("text-input").value;
    handleCheckButton(textInput);
});

const handleCheckButton = (textInput) => {
    if(textInput === null){
        alert("Please input a value");
        return;
    }
    const isPalindrome = checkPalindrome(textInput);
    const result = document.getElementById("result");
    if(isPalindrome){
        result.innerText = `${textInput} is a palindrome.`
    } else {
        result.innerText = `${textInput} is not a palindrome.`
    }
};

function checkPalindrome(str){
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    console.log("Cleaned Str: " + cleanedStr);
    const reversedStr = cleanedStr.split('').reverse().join('');
    console.log("Reversed Str: " + reversedStr);
    console.log(cleanedStr === reversedStr);
    return cleanedStr === reversedStr;
}