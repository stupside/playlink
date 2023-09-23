export const getJwtValidity = (seconds: number) => {

    const now = Date.now();

    return {
        from: now,
        to: now + seconds * 1000
    };
}