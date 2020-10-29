const verbose = process.env.npm_config_debug || false;

module.exports = (text, level) => {
    let date = `[${new Date().toISOString()}]`;

    switch ( level ) {
        case 0:
            if ( verbose ) console.debug(date, text);
            break;
        case 1:
            console.info(date, text);
            break;
        case 2:
            console.warn(date, text);
            break;
        case 3:
            console.error(date, text);
            break;
        default:
            console.log(date, text);
    }
}
