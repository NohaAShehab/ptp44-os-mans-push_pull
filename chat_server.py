from simple_websocket_server import WebSocket, WebSocketServer

import json
class ChatServer(WebSocket):
    user_ids = 0
    clients= []

    @property
    def onlineusers(self):
        online = list(map(lambda c:c.username, self.__class__.clients))
        return online
    @staticmethod
    def prepare_message(messageobj: str):
        data = {}
        received_data = json.loads(messageobj)
        if 'login' in received_data and 'username' in received_data:
            username = received_data['username']
            msg_to_send = f'{username} has been joined'
            data = {'username': username, 'message': msg_to_send,
                    'type':'login'}

        elif 'body' in received_data:
            data = {'message': received_data['body'], 'type':'chat'}

        return data
    # this function will be called if server receives a message

    @classmethod
    def send_to_all_clients(cls, message: str, exculude_client):
        for client in cls.clients:
            if client != exculude_client:
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
            self.send_message(json.dumps({'online': self.onlineusers}))

        message_data['online'] =self.onlineusers
        print(message_data)
        ChatServer.send_to_all_clients(json.dumps(message_data), self)






        # for client in ChatServer.clients:
        #     client.send_message(msg)


    def connected(self):
        """
          Called when a websocket client connects to the server.
        """
        ChatServer.user_ids += 1
        self.id = ChatServer.user_ids
        ChatServer.clients.append(self)






    def handle_close(self):
        ChatServer.clients.remove(self)
        # send message to all users that user has leaved
        msg_to_send = f'{self.username} has been disconnected'
        data = {'type':'logout','message': msg_to_send,
                'online': self.onlineusers}
        ChatServer.send_to_all_clients(json.dumps(data), self)


if __name__ == '__main__':
    server = WebSocketServer('', 8090,ChatServer)
    print("---server started")
    server.serve_forever()
