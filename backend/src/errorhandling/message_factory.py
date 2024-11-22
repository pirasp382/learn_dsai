from src.dto.message import Message
from src.dto.severity import Severity

import json

class MessageFactory:
    
    filename="./resources/messages.json"
    data=json.load(open(filename, "r", encoding="utf-8"))
    
    def buildMessage(self, error_code):
        message=self.data[error_code]
        return (Message.builder()
                .error_code(error_code)
                .message(message["message"])
                .severity(message["severity"])
                .build())