
class Message:
    def __init__(self, message=None, error_code=None, severity=None):
        self.error_code=error_code
        self.message=message
        self.severity=severity
        
    def __str__(self):
        result=""
        result+="Error Code: "+self.error_code+"\n" if self.error_code!=None else ""
        result+="Message: "+self.message+"\n" if self.message!=None else ""
        result+="Severity: "+self.severity+"\n" if self.severity!=None else ""
        return result
        
    @classmethod
    def builder(cls):
        return Message.Builder()
        
    class Builder:
        def __init__(self):
            self._message=None
            self._error_code=None
            self._severity=None
            
        def message(self, message):
            self._message=message
            return self
        
        def error_code(self, error_code):
            self._error_code=error_code
            return self
        
        def severity(self, severity):
            self._severity=severity
            return self
        
        def build(self):
            return Message(message=self._message,
                           error_code=self._error_code,
                           severity=self._severity)