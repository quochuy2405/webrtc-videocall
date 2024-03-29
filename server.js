const express = require('express');
const https = require('https');
const WebSocket = require('ws');
const fs = require('fs');

const app = express();

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const server = https.createServer(options, app);
const wss = new WebSocket.Server({ server });

// Dữ liệu lưu trữ các kết nối của người dùng
const users = {};

// Hàm gửi dữ liệu cho một kết nối WebSocket
function sendTo(connection, message) {
  connection.send(JSON.stringify(message));
}

// Xử lý kết nối từ client
wss.on('connection', function connection(ws, req) {
  // Lấy userId từ query string (có thể thay bằng các phương thức xác thực khác như JWT)
  const userId = req.url.split('?')[1];

  // Lưu trữ kết nối của người dùng
  users[userId] = ws;

  // Xử lý các tin nhắn từ client
  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    const { to, offer, answer, candidate } = data;

    // Gửi offer tới người dùng mục tiêu
    if (offer && users[to]) {
      sendTo(users[to], { from: userId, offer });
    }

    // Gửi answer tới người dùng mục tiêu
    if (answer && users[to]) {
      sendTo(users[to], { from: userId, answer });
    }

    // Gửi ICE candidate tới người dùng mục tiêu
    if (candidate && users[to]) {
      sendTo(users[to], { from: userId, candidate });
    }
  });

  // Xử lý đóng kết nối
  ws.on('close', function () {
    delete users[userId];
  });
});

server.listen(8080, function () {
  console.log('Server is running on port 8080');
});
