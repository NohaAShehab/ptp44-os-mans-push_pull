from simple_websocket_server import WebSocket, WebSocketServer

import json
class ChatServer(WebSocket):
    clients= []

    @staticmethod
    def prepare_message(messageobj: str):
        data = {}
        received_data = json.loads(messageobj)
        if 'login' in received_data and 'username' in received_data:
            username = received_data['username']
            msg_to_send = f'{username} has been joined'
            data = {'username': username, 'message': msg_to_send}

        elif 'body' in received_data:
            data = {'message': received_data['body']}

        return data
    # this function will be called if server receives a message

    @classmethod
    def send_to_all_clients(cls, message: str):
        for client in cls.clients:
            client.send_message(message)

    def handle(self):
        """
          Called when websocket frame is received.
          To access the frame data call self.data."""
        print(f"data: {self.data}")
        message_data = ChatServer.prepare_message(self.data)
        print("message_data",message_data)
        if 'username' in message_data:
            self.username = message_data.pop('username')

        ChatServer.send_to_all_clients(json.dumps(message_data))






        # for client in ChatServer.clients:
        #     client.send_message(msg)


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
    server = WebSocketServer('', 8090,ChatServer)
    print("---server started")
    server.serve_forever()
