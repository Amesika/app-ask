export const LetterOnly = {
    value: /^[A-Za-z]+$/,
    message: 'Please enter only letter',
}

export const NumberOnly = {
    value: /^[0-9]+$/,
    message: 'Please enter only number',
}

export const Email = {
    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    message: 'Please enter correcte email exemple: exemple@mail.com',
}
