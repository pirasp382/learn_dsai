from src.errorhandling.message_factory import MessageFactory

class Messages:
    
    UNTER_18=MessageFactory().buildMessage("MESSAGE_0001")
    KEINE_POSITIVE_BERUFSERFAHRUNG=MessageFactory().buildMessage("MESSAGE_0002")
    FALSCHES_GENDER=MessageFactory().buildMessage("MESSAGE_0003")
    FALSCHER_AUSBILDUNGSTITLE=MessageFactory().buildMessage("MESSAGE_0004")
    FALSCHER_JOBTITLE=MessageFactory().buildMessage("MESSAGE_0005")