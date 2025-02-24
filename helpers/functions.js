/*
+----------------------+
|                      |
| helpers/functions.js |
|                      |
+----------------------+
*/

const replaceChar = (old_char, new_char, str) => {
    const regex = new RegExp(old_char, 'g');
    return str.replace(regex, new_char);
}

const sendResponse = (res, data) => {
    if (data) {
        res.status(200).json({
            data
        });
    } else {
        res.status(404).json({
            log: "Not found"
        });
    }
}

const setIdForElement = (elements, num) => {
    console.log(elements.lenght);
    console.log(num);
    
    return num + elements.length;
}

module.exports = {
    replaceChar,
    sendResponse,
    setIdForElement
}