CREATE USER IF NOT EXISTS
  'example_migrate'@'%' IDENTIFIED BY 'migrate';

GRANT ALL PRIVILEGES ON *.* TO 'example_migrate'@'%';

FLUSH PRIVILEGES;