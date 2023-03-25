// Функція для генерації випадкових координат астероїда
function generateAsteroid() {
    const x = Math.floor(Math.random() * 101);
    const y = Math.floor(Math.random() * 101);
    const z = Math.floor(Math.random() * 101);
    return { x, y, z };
  }
  
  // Функція для обчислення відстані між двома точками в тривимірному просторі
  function calculateDistance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
  
  // Основна функція, що знаходить координати астероїда та координати та кількість використаних зондів
  function findAsteroid() {
    const asteroid = generateAsteroid();
    const probes = { count: 0, coordinates: [] };
  
    // Максимальна відстань, на яку може бути розташований астероїд
    const maxDistance = Math.sqrt(3) * 100;
  
    while (probes.count < 1000) { // Необхідна обмеження на кількість зондів, щоб уникнути зациклення
      // Генерація випадкових координат зонда
      const probe = { x: Math.floor(Math.random() * 101), y: Math.floor(Math.random() * 101), z: Math.floor(Math.random() * 101) };
      // Обчислення відстані від зонда до астероїда
      const distance = calculateDistance(asteroid, probe);
  
      if (distance <= maxDistance) { // Якщо зонд може досягти астероїда
        probes.count++; // Збільшення лічильника використаних зондів
        probes.coordinates.push(probe); // Додавання координат зонда до списку
        if (probes.count === Math.floor(distance / 10) + 1) { // Якщо кількість зондів відповідає потрібній кількості
          return { result: { location: asteroid, probes } }; // Повернення результату у форматі JSON
        }
      }
    }
  
    return { error: 'Asteroid not found' }; // Якщо астероїд не знайдено
  }
  
  console.log(findAsteroid());