INSERT INTO department (name)
VALUES 
    ('Salesman'),
    ('Accounting'),
    ('Developer'),
    ('Human Resource'),
    ('Interns');


INSERT INTO role (title, salary, department_id)
VALUES 
    ('Front-End Developer', 75000, 3),
    ('Salesman', 70000, 1),
    ('Accountant', 85000, 2),
    ('Head of HR', 60000, 4),
    ('Back-End Intern', 75000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Alex', 'Contreras', 1, 0),
    ('Max', 'Chester', 5,  0),
    ('Amanda', 'Todd', 4,  0),
    ('Veronica', 'Rodrigez', 2,  0),
    ('Sal', 'Vulcano', 3,  0)
