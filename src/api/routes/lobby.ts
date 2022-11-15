

export function generateLobbyCode(id_set : Set<string>) : {result: string, id_set: Set<string>} {
    let result;
    do {
        result = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 5; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    } while (id_set.has(result))
    id_set.add(result);
    return {result, id_set};
}