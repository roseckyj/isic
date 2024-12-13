export function formatCardNumber(cardNumber: string) {
    const s = cardNumber.split("");

    return (
        s[0] +
        " " +
        s[1] +
        s[2] +
        s[3] +
        " " +
        s[4] +
        s[5] +
        s[6] +
        " " +
        s[7] +
        s[8] +
        s[9] +
        " " +
        s[10] +
        s[11] +
        s[12] +
        " " +
        s[13]
    );
}
