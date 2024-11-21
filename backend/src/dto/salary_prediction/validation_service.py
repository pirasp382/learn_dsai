from src.dto.salary_prediction.salary_input import SalaryInput

def validate(input: SalaryInput):
    if input.age <18 or input.age>65:
        print("error")