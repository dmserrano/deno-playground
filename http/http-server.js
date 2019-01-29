import { args, green, red, bold, parse, parseDateTime, serve } from "./../package.js";

// Parse flags
const { p } = parse(args);
const PORT = p ? p : "8000";
const Server = serve(`localhost:${PORT}`);

const formatRequestMeta = ({ err, method, proto, url }) => {
    return `${proto} ${method} ${url}`;
};

const formatTodaysDate = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString();
    const formattedMinutes = minutes.length > 1 ? minutes : "0" + minutes;
    return `${month}/${day}/${year} ${hours}:${formattedMinutes}`;
};

async function startServer() {
    console.log(green(`Listening on port ${PORT}`));

    for await (const req of Server) {
        // Format status, will always work because for now
        const status = "200";

        const message = `${formatTodaysDate()} ${status} ${formatRequestMeta(req)}`;

        console.log(green(bold(message)));

        req.respond({ body: new TextEncoder().encode(req.url) });
    }
}

startServer();