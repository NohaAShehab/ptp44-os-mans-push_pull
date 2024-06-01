from simple_websocket_server import WebSocket, WebSocketServer

import json
class ChatServer(WebSocket):
    clients= []

    @staticmethod
    def prepare_message(messageobj: str):
        data = {}
        received_data = json.loads(messageobj)
        if 'username' in received_data:
            username = received_data['username']
            msg_to_send = f'{username} has been joined'
            data = {'username': username, 'message': msg_to_send}

        elif 'body' in received_data:
            data = {'message': received_data['body']}

        return data
    # this function will be called if server receives a message
    def handle(self):
        """
          Called when websocket frame is received.
          To access the frame data call self.data."""
        print(f"data: {self.data}")
        received_data= json.loads(self.data)
        if 'username' in received_data:
            self.username = received_data['username']
        else:
            self.username = 'Anonymous'

        print(list(map(lambda x:x.username, ChatServer.clients)))
        # once I received a message --> broadcasting to all users

        msg_to_send = {'body':f'{self.username} joined the chat' }
        msg = json.dumps(msg_to_send)
        for client in ChatServer.clients:
            client.send_message(msg)


    def connected(self):
        """
          Called when a websocket client connects to the server.
        """
        # print(f"---- client connected --> {self}")
        ChatServer.clients.append(self)
        print(f"clients: {ChatServer.clients}")
        # for c in ChatServer.clients:
        #     print('username' in c.__dict__)




    def handle_close(self):
        print(self.address, 'closed')
        ChatServer.clients.remove(self)


if __name__ == '__main__':
    server = WebSocketServer('', 8080,ChatServer)
    print("---server started")
    server.serve_forever()
