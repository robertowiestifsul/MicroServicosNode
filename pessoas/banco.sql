-- Criar um banco de dados chamado pessoas_api	

-- Criar a tabela pessoas

create table pessoas (
codigo serial not null primary key, 
nome varchar(50) not null);

-- inserir alguns registros
insert into pessoas (nome) values ('jorge'),('joão');