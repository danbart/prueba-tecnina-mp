-- sp_obtener_casos: Obtiene todos los casos
CREATE PROCEDURE sp_obtener_casos
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM Casos;
END;
GO

-- sp_crear_caso: Crea un nuevo caso
CREATE PROCEDURE sp_crear_caso
    @titulo NVARCHAR(100),
    @fiscal_id INT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Casos (Titulo, FiscalId, FechaCreacion)
    VALUES (@titulo, @fiscal_id, GETDATE());
END;
GO
