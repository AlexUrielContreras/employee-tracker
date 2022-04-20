INSERT INTO department (name)
VALUES 
    ('Marketing'),
    ('Finance'),
    ('Engineer'),
    ('Human Resource'),
    ('Interns'),
    ('Legal'),
    ('Sales'),
    ('Purchasing'),
    ('Management');


INSERT INTO role (title, salary, department_id)
VALUES 
    ('Front-End Developer', 75000, 3),
    ('Back-end Developer', 95000, 3),
    ('Accountant', 70000, 2),
    ('Accountant', 80000, 2),
    ('HR', 60000, 4),
    ('Inter', 75000, 5),
    ('CEO', 100000, 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Alex', 'Contreras', 1, 0),
    ('Max', 'Chester', 5,  0),
    ('Amanda', 'Todd', 4,  0),
    ('Veronica', 'Rodrigez', 2,  0),
    ('Sal', 'Vulcano', 3,  0)
