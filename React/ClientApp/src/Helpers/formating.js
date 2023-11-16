export function formatDate(input) {
    var date = new Date(input);
    var output = `
        ${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
    return output;
}

export function parseTags(input) {
    input = input.map(x => x.tag.name);
    var output = "";
    for (let i = 0; i < input.length; i++) {
        output += input[i];
        if (i < input.length - 1) {
            output += ", "
        }
    }
    return output;
}
