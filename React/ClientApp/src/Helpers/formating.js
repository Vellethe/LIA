export function formatDate(input) {
    var date = new Date(input);
    var output = `
        ${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
    return output;
}
