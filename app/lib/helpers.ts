export function slug(text: string) {
	const slugText = text
		.toLowerCase() // Convertir a minúsculas
		.replace(/[^\w\s-]/g, "") // Eliminar caracteres especiales, excepto guiones y espacios
		.trim() // Eliminar espacios en los extremos
		.replace(/\s+/g, "-") // Reemplazar espacios con guiones
		.replace(/--+/g, "-"); // Reemplazar múltiples guiones contiguos con solo uno
	return slugText;
}

export function formatDate(date: string) {
	const fechaObjeto = new Date(date);
	const opciones: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
	};
	const formatoFecha = new Intl.DateTimeFormat("es-ES", opciones).format(
		fechaObjeto,
	);
	return formatoFecha;
}
