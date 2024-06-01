from simple_websocket_server import WebSocket, WebSocketServer


class ChatServer(WebSocket):
    clients= []

    # this function will be called if server receives a message
    def handle(self):
        """
          Called when websocket frame is received.
          To access the frame data call self.data."""
        print(f"data: {self.data}")

    def connected(self):
        """
          Called when a websocket client connects to the server.
        """
        # print(f"---- client connected --> {self}")
        ChatServer.clients.append(self)
        print(f"clients: {ChatServer.clients}")


    def handle_close(self):
        print(self.address, 'closed')
        ChatServer.clients.remove(self)


if __name__ == '__main__':
    server = WebSocketServer('', 8080,ChatServer)
    print("---server started")
    server.serve_forever()
