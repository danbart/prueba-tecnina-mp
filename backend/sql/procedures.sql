USE ministerio;

GO
/* Crear usuario */
CREATE OR ALTER PROCEDURE sp_crear_usuario
  @nombre NVARCHAR(100),
  @correo NVARCHAR(150),
  @hash   NVARCHAR(255),
  @rol    NVARCHAR(20)
AS
INSERT INTO Usuarios(nombre,email,passwordHash,rol)
VALUES (@nombre,@correo,@hash,@rol);
GO

/* Login: obtener por email */
CREATE OR ALTER PROCEDURE sp_get_usuario_por_email
  @correo NVARCHAR(150)
AS
SELECT TOP 1 * FROM Usuarios WHERE email=@correo;
GO

/* Obtener todos los casos */
CREATE OR ALTER PROCEDURE sp_obtener_casos
AS
SELECT * FROM Casos;
GO

/* Crear caso */
CREATE OR ALTER PROCEDURE sp_crear_caso
  @id       INT = NULL,
  @titulo   NVARCHAR(200),
  @fiscalId INT
AS
BEGIN
    IF @id IS NULL  
    BEGIN
        INSERT INTO Casos (titulo, fiscalId)
        OUTPUT INSERTED.*
        VALUES (@titulo, @fiscalId);
    END
    ELSE 
    BEGIN
        UPDATE Casos
        SET    titulo   = @titulo,
               fiscalId = @fiscalId
        OUTPUT INSERTED.*
        WHERE  id = @id;
    END
END
GO

/* Reasignar caso */
CREATE OR ALTER PROCEDURE sp_reasignar_caso
  @id_caso INT,
  @nuevo_fiscal INT
AS
DECLARE @estado NVARCHAR(20),
        @fiscalOrigen INT,
        @fiscaliaOrigen INT,
        @fiscaliaNueva  INT;
SELECT @estado=estado,@fiscalOrigen=fiscalId
FROM   Casos WHERE id=@id_caso;

SELECT @fiscaliaOrigen=fiscaliaId FROM Usuarios WHERE id=@fiscalOrigen;
SELECT @fiscaliaNueva =fiscaliaId FROM Usuarios WHERE id=@nuevo_fiscal;

IF @estado<>'pendiente' OR @fiscalOrigen IS NULL
   OR @fiscaliaOrigen <> @fiscaliaNueva
BEGIN
  INSERT INTO ReasignacionLogs(idCaso,idFiscal,intentoId)
  VALUES (@id_caso,@nuevo_fiscal,@fiscalOrigen);
  RAISERROR('No cumple condiciones de reasignación',16,1);
  RETURN;
END

UPDATE Casos SET fiscalId=@nuevo_fiscal WHERE id=@id_caso;
GO

/* Actualizar estado */
CREATE OR ALTER PROCEDURE sp_actualizar_estado_caso
  @id_caso INT,
  @estado  NVARCHAR(20)
AS
UPDATE Casos SET estado=@estado WHERE id=@id_caso;
INSERT INTO CasosHistorial(idCaso,estado) VALUES (@id_caso,@estado);
GO

CREATE OR ALTER PROCEDURE sp_historial_caso
  @id_caso INT
AS
SELECT * FROM CasosHistorial WHERE idCaso=@id_caso ORDER BY fecha;
GO