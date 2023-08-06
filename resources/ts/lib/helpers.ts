export function formatDate(date: string) {
    const fechaObjeto = new Date(date);
    const opciones: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };
    const formatoFecha = new Intl.DateTimeFormat("es-ES", opciones).format(
        fechaObjeto
    );
    return formatoFecha;
}
