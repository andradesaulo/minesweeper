function getMinesQuantity(difficulty) {
    if (difficulty === 'easy') {
        return 40;
    } else if (difficulty === 'medium') {
        return 60;
    } else if (difficulty === 'hard') {
        return 99;
    }
}

export { getMinesQuantity };