-- Criar um banco de dados chamado produtos_api 

-- Criar a tabela produtos

create table produtos (
codigo serial not null primary key, 
nome varchar(50) not null, 
preco decimal(10,2) not null, 
estoque integer not null);

-- inserir alguns registros
insert into produtos (nome, preco, estoque) values ('Monitor 15', 350.00, 8), ('Pen Drive 128GB', 150.00, 10);
