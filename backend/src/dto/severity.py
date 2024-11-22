from enum import Enum

class Severity(Enum):
    INFO="info"
    WARNING="warning"
    ERROR="error"
    
    def __str__(self):
        return self.name