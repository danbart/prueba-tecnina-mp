USE ministerio;

GO
/* Usuarios */
IF OBJECT_ID ('Usuarios') IS NULL
CREATE TABLE
    Usuarios (
        id INT IDENTITY PRIMARY KEY,
        nombre NVARCHAR (100) NOT NULL,
        email NVARCHAR (150) NOT NULL UNIQUE,
        passwordHash NVARCHAR (255) NOT NULL,
        rol NVARCHAR (20) NOT NULL
    );

GO
/* Fiscalías */
IF OBJECT_ID ('Fiscalias') IS NULL
CREATE TABLE
    Fiscalias (
        id INT IDENTITY PRIMARY KEY,
        nombre NVARCHAR (150) NOT NULL
    );

GO
/* Agregar columna fiscaliaId a Usuarios */
IF COL_LENGTH ('Usuarios', 'fiscaliaId') IS NULL
ALTER TABLE Usuarios ADD fiscaliaId INT REFERENCES Fiscalias (id);

GO
/* Casos */
IF OBJECT_ID ('Casos') IS NULL
CREATE TABLE
    Casos (
        id INT IDENTITY PRIMARY KEY,
        titulo NVARCHAR (200) NOT NULL,
        estado NVARCHAR (20) NOT NULL DEFAULT 'pendiente',
        fiscalId INT NOT NULL,
        fechaCreacion DATETIME2 NOT NULL DEFAULT SYSDATETIME (),
        CONSTRAINT FK_Casos_Fiscal FOREIGN KEY (fiscalId) REFERENCES Usuarios (id)
    );

GO
/* Historial de estados */
IF OBJECT_ID ('CasosHistorial') IS NULL
CREATE TABLE
    CasosHistorial (
        id INT IDENTITY PRIMARY KEY,
        idCaso INT NOT NULL REFERENCES Casos (id),
        estado NVARCHAR (20) NOT NULL,
        fecha DATETIME2 NOT NULL DEFAULT SYSDATETIME ()
    );

GO
/* Logs de reasignación fallida */
IF OBJECT_ID ('ReasignacionLogs') IS NULL
CREATE TABLE
    ReasignacionLogs (
        id INT IDENTITY PRIMARY KEY,
        idCaso INT,
        idFiscal INT,
        intentoId INT,
        fecha DATETIME2 NOT NULL DEFAULT SYSDATETIME ()
    );

GO