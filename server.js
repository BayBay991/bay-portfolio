const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Biar bisa diakses dari frontend
    res.end(JSON.stringify({ 
        message: "Halo dari Backend!", 
        status: "Online",
        timestamp: new Date().toISOString()
    }));
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});
