from src.dto.salary_prediction.Salary_Input import Salary_Input

def validate(input: Salary_Input):
    if input.age <18 or input.age>65:
        print("error")