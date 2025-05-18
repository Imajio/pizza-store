INSERT INTO users (email, password_hash, role) VALUES
                                                   ('admin@pizzastore.com', '$2a$10$exampleHash', 'ADMIN'),
                                                   ('user@pizzastore.com', '$2a$10$exampleHash', 'USER');

INSERT INTO pizzas (name, description, price, image_url) VALUES
                                                             ('Margherita', 'Classic pizza with tomato and mozzarella', 8.99, 'margherita.jpg'),
                                                             ('Pepperoni', 'Spicy pepperoni with cheese', 9.99, 'pepperoni.jpg');
