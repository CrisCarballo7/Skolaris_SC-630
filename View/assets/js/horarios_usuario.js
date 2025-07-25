document.addEventListener('DOMContentLoaded', async () => {
  const tabla = document.querySelector('.schedule-table tbody');

  // Definimos los días como columnas (para mapear)
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  // Horas base (deben coincidir con las del HTML en orden)
  const horasBase = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];

  // Decodificar el token y obtener grupoId
  const token = localStorage.getItem('token');
  if (!token) return alert("No hay token");

  const payload = JSON.parse(atob(token.split('.')[1]));
  const grupoId = "685a6b802077cebfd91b0fd9";

  // Obtener los bloques desde la API
  try {
    const res = await fetch(`http://localhost:8000/api/horarios/bloques/${grupoId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const bloques = await res.json();

    // Limpiar tabla
    tabla.innerHTML = '';

    // Generar tabla dinámica
    horasBase.forEach(hora => {
      const fila = document.createElement('tr');
      const tdHora = document.createElement('td');
      tdHora.textContent = hora;
      fila.appendChild(tdHora);

      diasSemana.forEach(dia => {
        const celda = document.createElement('td');

        // Buscar si hay clase en esa celda
        
        const clase = bloques.find(b =>
  b.dia === dia &&
  b.horaInicio.slice(0, 5) === hora.padStart(5, '0')
);

        if (clase) {
          const div = document.createElement('div');
          div.className = 'class-block';
          div.textContent = clase.materia;

          div.onclick = () => showModal(
            clase.materia,
            `${clase.horaInicio} - ${clase.horaFin}`,
            `Profe: ${clase.docente}`,
            clase.aula || 'Sin comentarios'
          );

          celda.appendChild(div);
        }

        fila.appendChild(celda);
      });

      tabla.appendChild(fila);
    });

  } catch (err) {
    console.error('Error al cargar horarios:', err);
    alert('No se pudieron obtener los horarios.');
  }
});
